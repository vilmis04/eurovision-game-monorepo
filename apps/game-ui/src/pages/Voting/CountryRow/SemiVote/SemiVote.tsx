import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { SemiVoteProps } from '../CountryRow.types';
import { Box, FormControlLabel, Typography } from '@mui/material';
import { styles } from './SemiVote.styles';

export const SemiVote: React.FC<SemiVoteProps> = ({
  inFinal,
  updateScore,
  isDisabled,
}) => {
  const notClickable = isDisabled && !inFinal;
  const selected = <CheckCircle sx={styles.icon} />;
  const notSelected = (
    <RadioButtonUnchecked
      sx={[styles.icon, notClickable && styles.notClickable]}
    />
  );
  const handleClick = () => {
    if (notClickable) return;
    updateScore({ inFinal: !inFinal });
  };

  return (
    <Box onClick={handleClick}>
      <FormControlLabel
        control={<Box role="checkbox">{inFinal ? selected : notSelected}</Box>}
        label={
          <Typography
            variant="body2"
            sx={[styles.label, notClickable && styles.notClickable]}
          >
            Top ten
          </Typography>
        }
        labelPlacement="bottom"
      />
    </Box>
  );
};
