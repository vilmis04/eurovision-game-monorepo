import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import { paths } from './paths';
import { Box } from '@mui/material';
import { Layout } from './components/Layout/Layout';
import { Groups } from './pages/Groups/Groups';
import { GroupView } from './pages/Groups/GroupView/GroupView';

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

export const App = () => <RouterProvider router={router} />;
