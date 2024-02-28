import { Box } from '@mui/material';
import { getIsAuthenticated } from './api/auth/authApi.server';
import Login from './Login/Login';
import { ClientProvider } from './providers/ClientProvider';

const BASE_URL = process.env.BASE_SERVICE_URL;

export default async function Index() {
  const data = await getIsAuthenticated();
  let isAuthenticated: boolean = false;
  if (data.status === 200) {
    isAuthenticated = await data.json();
  }

  return (
    <ClientProvider>
      {isAuthenticated ? <Box>No data found</Box> : <Login />}
    </ClientProvider>
  );
}
