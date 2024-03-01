import { Box } from '@mui/material';
import { getIsAuthenticated } from './api/auth/authApi.server';
import { redirect } from 'next/navigation';
import { paths } from '../paths';

export default async function Index() {
  const data = await getIsAuthenticated();
  let isAuthenticated = false;
  if (data.status === 200) {
    isAuthenticated = await data.json();
  }

  if (!isAuthenticated) redirect(paths.login);

  return <Box>Vote for the winners</Box>;
}
