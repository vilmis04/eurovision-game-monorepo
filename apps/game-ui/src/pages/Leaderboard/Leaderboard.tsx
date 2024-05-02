import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  MenuItem,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { BackgroundContext } from '../../components/Layout/Layout';
import { GradientType } from '@eurovision-game-monorepo/core-ui';
import { ExpandMore } from '@mui/icons-material';
import { styles } from './Leaderboard.styles';
import { useGetLeaderboardQuery } from '../../api/group/groupApi';
import { BronzeStar, GoldStar, SilverStar } from '../../components/icons/icons';

export const Leaderboard = () => {
  const setBackground = useContext(BackgroundContext);
  useEffect(() => {
    setBackground(GradientType.GRADIENT2);
  }, []);

  const [isGroupMenuOpen, setIsGroupMenuOpen] = useState(false);
  const [filter, setFilter] = useState(0);
  // TODO: add error handling
  const { data: leaderboardData, isFetching } = useGetLeaderboardQuery(filter);

  const toggleGroupMenu = () => setIsGroupMenuOpen((isOpen) => !isOpen);
  const selectedGroup = leaderboardData?.groups[filter];

  const ranking = [<GoldStar />, <SilverStar />, <BronzeStar />];
  const showRanking =
    leaderboardData &&
    Object.values(leaderboardData.playerList).some(({ score }) => score !== 0);

  const selectAllItem = [0, 'All'];

  return isFetching ? (
    <CircularProgress />
  ) : !showRanking ? (
    <Box>No results</Box>
  ) : (
    <>
      <Box sx={styles.container}>
        <Box sx={styles.topBar}>
          <Button
            variant="text"
            sx={styles.groupSelectionButton}
            onClick={toggleGroupMenu}
          >
            <Typography variant="body1" sx={styles.buttonText}>
              {filter ? selectedGroup : 'All'}
            </Typography>
            <ExpandMore />
          </Button>
        </Box>
        <Box sx={styles.memberList}>
          {(leaderboardData?.playerList || []).map(
            ({ name, score, position }) => (
              <Box key={name} sx={styles.playerNameBox}>
                <Typography variant="body1" sx={styles.positionNumber}>
                  {position}
                </Typography>
                <Box sx={styles.playerTextContainer}>
                  <Typography variant="body1" sx={styles.playerName}>
                    {name}
                  </Typography>
                  <Typography variant="body1" sx={styles.playerScore}>
                    {score} points
                  </Typography>
                </Box>
                <Box sx={styles.ranking}>
                  {showRanking && ranking[position - 1]}
                </Box>
              </Box>
            )
          )}
        </Box>
      </Box>
      <Drawer
        anchor="bottom"
        open={isGroupMenuOpen}
        onClick={toggleGroupMenu}
        PaperProps={{
          sx: styles.groupMenu,
        }}
      >
        <Typography variant="body1" sx={styles.groupMenuInstruction}>
          Choose group
        </Typography>
        {[selectAllItem, ...Object.entries(leaderboardData?.groups || {})].map(
          ([id, name]) => (
            <MenuItem
              key={id}
              sx={[
                styles.groupMenuItem,
                Number(id) === filter && styles.activeGroupMenuItem,
              ]}
              onClick={() => setFilter(Number(id))}
            >
              {name}
            </MenuItem>
          )
        )}
      </Drawer>
    </>
  );
};
