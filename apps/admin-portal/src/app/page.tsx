import Login from './Login/Login';
import { ClientProvider } from './providers/ClientProvider';
import { Dashboard } from './Dashboard/Dashborad';
import { redirect } from 'next/navigation';
import { paths } from '../paths';
import { getIsAuthenticated } from './api/serverAPIs/authApi';

const BASE_URL = process.env.BASE_SERVICE_URL;

export default async function Index() {
  // const data = await getIsAuthenticated();
  // let isAuthenticated: boolean = false;
  // if (data.status === 200) {
  //   isAuthenticated = await data.json();
  // }

  // TODO: remove after testing
  const isAuthenticated = true;

  if (isAuthenticated) redirect(paths.config);

  return <ClientProvider>{!isAuthenticated && <Login />}</ClientProvider>;
}
