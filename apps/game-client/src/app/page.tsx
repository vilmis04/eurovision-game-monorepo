import { Box } from '@mui/material';
import { getIsAuthenticated } from './api/auth/authApi.server';

export default async function Index() {
  const data = await getIsAuthenticated();
  let isAuthenticated = false;
  if (data.status === 200) {
    isAuthenticated = await data.json();
  }

  return <Box>{isAuthenticated ? 'Vote for the winners' : 'Please login'}</Box>;
}
