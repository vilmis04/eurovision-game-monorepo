import { GradientType } from '@eurovision-game-monorepo/core-ui';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { BackgroundContext } from '../../components/Layout/Layout';
import { ArrowDownward } from '@mui/icons-material';
import { useGetGeneralInfoQuery } from '../../api/generalInfo/generalInfoApi';
import { GameType } from '@eurovision-game-monorepo/types';
import { useGetCountriesQuery } from '../../api/country/countryApi';

export const Voting: React.FC = () => {
  const selectGradient = useContext(BackgroundContext);
  const { data: generalInfo, isFetching: isFetchingGeneralInfo } =
    useGetGeneralInfoQuery();
  const { data: countryList, isFetching: isFetchingCountries } =
    useGetCountriesQuery(
      { year: Number(generalInfo?.year) },
      { skip: !generalInfo }
    );

  const isFetching = isFetchingCountries || isFetchingGeneralInfo;

  useEffect(() => {
    selectGradient(GradientType.GRADIENT2);
  }, []);

  const gameTypeMessage =
    (generalInfo?.gameType &&
      {
        [GameType.SEMI1]: '1st semi-final',
        [GameType.SEMI2]: '2nd semi-final',
        [GameType.FINAL]: 'Final',
      }[generalInfo.gameType]) ||
    '';

  return isFetching ? (
    // TODO: add proper spinner
    <CircularProgress />
  ) : (
    <Box>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1.25rem 1.5rem',
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
            {gameTypeMessage}
          </Typography>
          <Typography variant="body1">
            {'Voting stops in '}
            <Typography
              component="span"
              variant="body1"
              sx={{ fontWeight: 'medium' }}
            >
              05:21
            </Typography>
          </Typography>
        </Box>
        <Box
          sx={{
            borderTop: '1px solid',
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 1.5rem',
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 'light' }}>
            0/10 selected
          </Typography>
          <Button variant="text" sx={{ color: 'common.white' }}>
            <ArrowDownward />
            Order
          </Button>
        </Box>
      </Box>
      <Box>
        {countryList?.map(({ name, code, artist, song }) => (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem 1.5rem',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
            key={name}
          >
            <Box>
              <Box
                component="img"
                src={`public/flags/${code}.svg`}
                sx={{
                  border: '3px solid white',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                }}
              />
            </Box>
            <Box
              sx={{
                width: '100%',
                padding: '0 1.25rem',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'medium',
                }}
              >
                {name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 'medium',
                }}
              >
                {artist}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 'light',
                }}
              >
                {song}
              </Typography>
            </Box>
            <Box>Vote here</Box>
          </Box>
        ))}
        <Typography
          variant="body1"
          sx={{
            padding: '1rem 1.5rem',
            textAlign: 'center',
            color: 'secondary.light',
          }}
        >
          Your votes are saved automatically
        </Typography>
      </Box>
    </Box>
  );
};
