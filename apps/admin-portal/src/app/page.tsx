import { getIsAuthorized } from './api/auth/authApi';

export default async function Index() {
  const BASE_URL = process.env.BASE_SERVICE_URL;
  const data = await getIsAuthorized();

  if (data) {
    // redirect to config dashboard
  } else {
    // redirect to login
  }

  return null;
}
