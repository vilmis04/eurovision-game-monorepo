import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import GroupsIcon from '@mui/icons-material/Groups';
import { HomePaths, paths } from '../../paths';
import { useEffect } from 'react';
import { styles } from './Layout.styles';

export const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === paths.home) {
      navigate(paths.voting);
    }
  }, []);

  const currentTab = {
    [HomePaths.GROUPS]: 0,
    [HomePaths.VOTING]: 1,
    [HomePaths.LEADERBOARD]: 2,
  }[pathname];

  return (
    <Box>
      <Outlet />
      <BottomNavigation showLabels value={currentTab} sx={styles.navbar}>
        <BottomNavigationAction
          label="Groups"
          icon={<GroupsIcon />}
          onClick={() => navigate(paths.groups)}
        />
        <BottomNavigationAction
          label="Voting"
          icon={<HowToVoteIcon />}
          onClick={() => navigate(paths.voting)}
        />
        <BottomNavigationAction
          label="Leaderboard"
          icon={<LeaderboardIcon />}
          onClick={() => navigate(paths.leaderboard)}
        />
      </BottomNavigation>
    </Box>
  );
};
