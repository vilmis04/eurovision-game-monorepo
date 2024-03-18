import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import { paths } from './paths';
import { Box } from '@mui/material';
import { Layout } from './components/Layout/Layout';

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <Layout />,
    children: [
      {
        path: paths.groups,
        element: <Box sx={{ color: 'black' }}>Groups</Box>,
        index: true,
      },
      {
        path: paths.voting,
        element: <Box sx={{ color: 'black' }}>Voting</Box>,
      },
      {
        path: paths.leaderboard,
        element: <Box sx={{ color: 'black' }}>Leaderboard</Box>,
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
