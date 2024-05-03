import { GetScoresResponse } from '@eurovision-game-monorepo/types';
import { Drawer, Box, Typography, Button } from '@mui/material';
import { CountryResponse } from '../../../api/country/countryApi.types';
import { useContext, useEffect, useState } from 'react';
import { styles } from './FinalVoteDrawer.styles';
import { ErrorContext } from '../../../components/ErrorOverlay/ErrorContext';

interface FinalVoteDrawerProps {
  handleClose: () => void;
  updateScore: (score: GetScoresResponse) => void;
  notAvailableSpots: number[];
  countryCode: string | null;
  votingScore: GetScoresResponse | undefined;
  votingCountry: CountryResponse | undefined;
}

export const FinalVoteDrawer: React.FC<FinalVoteDrawerProps> = ({
  countryCode,
  handleClose,
  updateScore,
  notAvailableSpots,
  votingScore,
  votingCountry,
}) => {
  const [selectedPosition, setSelectedPosition] = useState<number>(0);
  const { setErrorMessage } = useContext(ErrorContext);

  useEffect(() => {
    if (votingScore) {
      setSelectedPosition(votingScore.position);
    }
  }, [countryCode]);

  const handleUpdateScore = () => {
    if (votingScore) {
      updateScore({ ...votingScore, position: selectedPosition });
      handleClose();
    } else {
      setErrorMessage('scores failed to load');
    }
  };

  return (
    <Drawer
      open={Boolean(countryCode)}
      anchor="bottom"
      PaperProps={{ sx: styles.container }}
      onClose={handleClose}
    >
      <Box>
        <Box sx={styles.topBar} />
        <Box
          component="img"
          src={`flags/${countryCode}.svg`}
          sx={styles.flag}
        />
        <Box sx={{ paddingLeft: '1rem' }}>
          <Typography variant="body1" sx={styles.countryName}>
            {votingCountry?.name}
          </Typography>
          <Typography variant="body1" sx={styles.label}>
            Select place
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.voteGrid}>
        {Array(26)
          .fill(null)
          .map((_, index) => {
            const position = index + 1;
            const isSelected = position === selectedPosition;
            const isOccupied = notAvailableSpots.includes(position);
            const isSameCountry = votingScore?.position === position;
            const variant = isSelected ? 'contained' : 'text';

            return (
              <Button
                key={index}
                variant={variant}
                onClick={() =>
                  setSelectedPosition(isSameCountry ? 0 : position)
                }
                disabled={isSameCountry ? false : isOccupied}
                sx={[variant === 'text' && styles.textVariant]}
              >
                {position}
              </Button>
            );
          })}
      </Box>
      <Box sx={styles.buttonContainer}>
        <Button
          variant="text"
          sx={[styles.textVariant, styles.cancelButton]}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={handleUpdateScore}>
          Save
        </Button>
      </Box>
    </Drawer>
  );
};
