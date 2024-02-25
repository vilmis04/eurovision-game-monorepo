import { Box } from '@mui/material';
import { getIsAuthenticated } from './api/auth/authApi';
import Login from './Login/Login';

export default async function Index() {
  const BASE_URL = process.env.BASE_SERVICE_URL;
  const data = await getIsAuthenticated();
  let isAuthenticated: boolean = false;
  if (data.status === 200) {
    isAuthenticated = await data.json();
  }

  return <Box>{isAuthenticated ? <Box>No data found :(</Box> : <Login />}</Box>;
}
