import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import { paths } from './paths';
import { ThemeProvider } from '@mui/material';
import { Layout } from './components/Layout/Layout';
import { Groups } from './pages/Groups/Groups';
import { GroupView } from './pages/Groups/GroupView/GroupView';
import { SnackbarContext } from './components/SnackbarContext/SnackbarContext';
import { Provider } from 'react-redux';
import { theme } from '../theme';
import { store } from './redux/store';
import { useSnackbar } from './components/SnackbarContext/useSnackbar';
import { Auth } from './components/Auth/Auth';
import { GroupJoin } from './pages/Groups/GroupView/GroupJoin/GroupJoin';
import { Voting } from './pages/Voting/Voting';
import { Leaderboard } from './pages/Leaderboard/Leaderboard';
import { ErrorContext } from './components/ErrorOverlay/ErrorContext';
import { useErrorOverlay } from './components/ErrorOverlay/useErrorOverlay';
import { GlobalStyles } from './components/GlobalStyles/GlobalStyles';

const router = createBrowserRouter([
  {
    path: paths.home,
    element: (
      <Auth>
        <Layout />
      </Auth>
    ),
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
        element: <Voting />,
      },
      {
        path: paths.leaderboard,
        element: <Leaderboard />,
      },
    ],
  },
  {
    path: paths.joinGroup,
    element: <GroupJoin />,
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
  const errorOverlay = useErrorOverlay();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarContext.Provider value={snackbar}>
          <ErrorContext.Provider value={errorOverlay}>
            <GlobalStyles />
            <RouterProvider router={router} />
          </ErrorContext.Provider>
        </SnackbarContext.Provider>
      </ThemeProvider>
    </Provider>
  );
};
