import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { HomePaths, paths } from '../../paths';
import { createContext, useEffect, useState } from 'react';
import { styles } from './Layout.styles';
import { Background, GradientType } from '@eurovision-game-monorepo/core-ui';
import { GroupsIcon, LeaderboardIcon, VotingIcon } from '../icons/icons';
import { Toast } from '../Toast/Toast';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const BackgroundContext = createContext((variant: GradientType) => {});

export const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [gradient, setGradient] = useState(GradientType.GRADIENT1);
  const selectBackground = (variant: GradientType) => setGradient(variant);

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
    <BackgroundContext.Provider value={selectBackground}>
      <Background variant={gradient} sx={styles.container}>
        <Box sx={styles.outlet}>
          <Outlet />
        </Box>
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
        <Toast />
      </Background>
    </BackgroundContext.Provider>
  );
};
