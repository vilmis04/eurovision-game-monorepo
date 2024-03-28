import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { HomePaths, paths } from '../../paths';
import { useEffect } from 'react';
import { styles } from './Layout.styles';
import { Background } from '@eurovision-game-monorepo/core-ui';
import { GroupsIcon, LeaderboardIcon, VotingIcon } from '../icons/icons';

export const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [rootPath] = pathname.slice(1).split('/');

  useEffect(() => {
    if (pathname === paths.home) {
      navigate(paths.voting);
    }
  }, []);

  const currentTab = {
    [HomePaths.GROUPS]: 0,
    [HomePaths.VOTING]: 1,
    [HomePaths.LEADERBOARD]: 2,
  }[rootPath];

  const navConfig = [
    {
      label: 'Groups',
      icon: <GroupsIcon />,
      path: paths.groups,
    },
    {
      label: 'Voting',
      icon: <VotingIcon />,
      path: paths.voting,
    },
    {
      label: 'Leaderboard',
      icon: <LeaderboardIcon />,
      path: paths.leaderboard,
    },
  ];

  return (
    <Background variant="gradient1">
      <Outlet />
      <BottomNavigation showLabels value={currentTab} sx={styles.navbar}>
        {navConfig.map(({ icon, label, path }, index) => (
          <BottomNavigationAction
            sx={currentTab === index ? styles.active : styles.default}
            key={label}
            label={label}
            icon={icon}
            onClick={() => navigate(path)}
          />
        ))}
      </BottomNavigation>
    </Background>
  );
};
