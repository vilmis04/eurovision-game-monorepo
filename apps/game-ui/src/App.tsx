import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import { paths } from './paths';
import { Box } from '@mui/material';

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <Box sx={{ color: 'black' }}>Home Page</Box>,
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
