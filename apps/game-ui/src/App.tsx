import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import { paths } from './paths';
import { Box, ThemeProvider } from '@mui/material';
import { Layout } from './components/Layout/Layout';
import { Groups } from './pages/Groups/Groups';
import { GroupView } from './pages/Groups/GroupView/GroupView';
import { SnackbarContext } from './components/SnackbarContext/SnackbarContext';
import { Provider } from 'react-redux';
import { theme } from '../theme';
import { store } from './redux/store';
import { GlobalStyles } from '@eurovision-game-monorepo/core-ui';
import { useSnackbar } from './components/SnackbarContext/useSnackbar';

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <Layout />,
    children: [
      {
        path: paths.groups,
        element: <Groups />,
      },
      {
        path: paths.group.url,
        element: <GroupView />,
      },
      {
        path: paths.voting,
        element: <Box>Voting</Box>,
      },
      {
        path: paths.leaderboard,
        element: <Box>Leaderboard</Box>,
      },
    ],
  },
  {
    path: paths.signUp,
    element: <SignUp />,
    index: true,
  },
  {
    path: paths.login,
    element: <Login />,
    index: true,
  },
]);

export const App = () => {
  const snackbar = useSnackbar();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarContext.Provider value={snackbar}>
          <GlobalStyles />
          <RouterProvider router={router} />
        </SnackbarContext.Provider>
      </ThemeProvider>
    </Provider>
  );
};
