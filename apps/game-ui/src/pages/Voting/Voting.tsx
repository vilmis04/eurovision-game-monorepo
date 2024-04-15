import { GradientType } from '@eurovision-game-monorepo/core-ui';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { BackgroundContext } from '../../components/Layout/Layout';
import { ArrowDownward } from '@mui/icons-material';
import {
  GameType,
  useGetGeneralInfoQuery,
} from '../../api/generalInfo/generalInfoApi';

export const Voting: React.FC = () => {
  const selectGradient = useContext(BackgroundContext);
  const { data: generalInfo, isFetching } = useGetGeneralInfoQuery();

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
      <Box>CountryList</Box>
    </Box>
  );
};
