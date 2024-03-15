import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';

const router = createBrowserRouter([
  //   {
  //     path: '/',
  //     element: <Home />,
  //   },
  {
    path: '/sign-up',
    element: <SignUp />,
    index: true,
  },
  {
    path: '/login',
    element: <Login />,
    index: true,
  },
]);

export const App = () => <RouterProvider router={router} />;
