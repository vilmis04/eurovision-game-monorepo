import { Box } from '@mui/material';
import Login from './Login/Login';
import { ClientProvider } from './providers/ClientProvider';
import { Dashboard } from './Dashboard/Dashborad';

const BASE_URL = process.env.BASE_SERVICE_URL;

export default async function Index() {
  // const data = await getIsAuthenticated();
  // let isAuthenticated: boolean = false;
  // if (data.status === 200) {
  //   isAuthenticated = await data.json();
  // }

  // TODO: remove after testing
  const isAuthenticated = true;
  return (
    <ClientProvider>
      {isAuthenticated ? <Dashboard /> : <Login />}
    </ClientProvider>
  );
}
