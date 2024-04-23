import { GradientType } from '@eurovision-game-monorepo/core-ui';
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { BackgroundContext } from '../../components/Layout/Layout';
import { useGetGeneralInfoQuery } from '../../api/generalInfo/generalInfoApi';
import { useGetCountriesQuery } from '../../api/country/countryApi';
import { Topbar } from './Topbar/Topbar';
import { CountryRow } from './CountryRow/CountryRow';
import { styles } from './Voting.styles';
import { styles as countryRowStyles } from './CountryRow/CountryRow.styles';
import {
  useGetScoresQuery,
  useUpdateScoreMutation,
} from '../../api/score/scoreApi';
import { GameType } from '@eurovision-game-monorepo/types';

export const Voting: React.FC = () => {
  const selectGradient = useContext(BackgroundContext);
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [selectedFinalPosition, setSelectedFinalPosition] = useState<number>(0);

  const { data: generalInfo, isFetching: isFetchingGeneralInfo } =
    useGetGeneralInfoQuery();
  const { data: countryList, isFetching: isFetchingCountries } =
    useGetCountriesQuery(
      { year: Number(generalInfo?.year), gameType: generalInfo?.gameType },
      { skip: !generalInfo }
    );
  const { data: scoreList } = useGetScoresQuery();

  const [updateScore] = useUpdateScoreMutation();

  const isFetching = isFetchingCountries || isFetchingGeneralInfo;

  useEffect(() => {
    selectGradient(GradientType.GRADIENT2);
  }, []);

  const scoredCountries = scoreList?.filter(({ inFinal, position }) =>
    generalInfo?.gameType === GameType.FINAL ? position : inFinal
  ).length;

  // TODO: use in modal for final position voting
  const notAvailableSpots = (scoreList || [])
    .filter(({ position }) => position)
    .map(({ position }) => position);

  const isSemiSpotAvailable =
    (scoreList || []).filter(({ inFinal }) => inFinal).length < 10;

  const votingCountry = countryList?.find(({ code }) => code === countryCode);
  const handleClose = () => {
    setSelectedFinalPosition(0);
    setCountryCode(null);
  };

  const votingScore = scoreList?.find(
    ({ country }) => country === votingCountry?.name
  );
  const handleUpdateScore = () => {
    updateScore({
      ...votingScore,
      position: selectedFinalPosition,
    });
    handleClose();
  };

  const openVotingModal = (code: string) => {
    setCountryCode(code);
  };

  return isFetching ? (
    // TODO: add proper spinner
    <CircularProgress />
  ) : (
    <>
      <Box sx={styles.container}>
        <Topbar
          gameType={generalInfo?.gameType}
          selected={scoredCountries}
          endTime={generalInfo?.votingEnd}
        />
        <Box sx={styles.countries}>
          {(countryList || []).map(({ name, code, artist, song }) => (
            <CountryRow
              key={name}
              name={name}
              code={code}
              artist={artist}
              song={song}
              gameType={generalInfo?.gameType}
              score={scoreList?.find(({ country }) => country === name)}
              updateScore={updateScore}
              isSemiSpotAvailable={isSemiSpotAvailable}
              openVotingModal={openVotingModal}
            />
          ))}
          <Typography variant="body1" sx={styles.notice}>
            Your votes are saved automatically
          </Typography>
        </Box>
      </Box>
      <Drawer
        open={Boolean(countryCode)}
        anchor="bottom"
        PaperProps={{ sx: { background: '#480082', padding: '1.5rem 1rem' } }}
        onClose={handleClose}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingBottom: '1.25rem',
            }}
          >
            <Box
              component="img"
              src={`flags/${countryCode}.svg`}
              sx={countryRowStyles.flag}
            />
            <Box sx={{ paddingLeft: '1rem' }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 'medium',
                }}
              >
                {votingCountry?.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'light',
                }}
              >
                Select place
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
            }}
          >
            {Array(26)
              .fill(null)
              .map((_, index) => {
                const position = index + 1;
                const isSelected = position === selectedFinalPosition;
                const isOccupied = notAvailableSpots.includes(position);
                const isSameCountry = votingScore?.position === position;
                const variant =
                  isSelected || (isSameCountry && selectedFinalPosition === 0)
                    ? 'contained'
                    : 'text';

                return (
                  <Button
                    key={index}
                    variant={variant}
                    onClick={() =>
                      setSelectedFinalPosition(isSameCountry ? 0 : position)
                    }
                    disabled={isSameCountry ? false : isOccupied}
                    sx={[
                      variant === 'text' && {
                        color: 'common.white',
                      },
                    ]}
                  >
                    {position}
                  </Button>
                );
              })}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="text"
              sx={{ color: 'common.white', padding: '0.5rem 1.25rem' }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleUpdateScore}>
              Save
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};
