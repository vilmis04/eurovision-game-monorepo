const BASE_URL = process.env.BASE_SERVICE_URL;

export async function getIsAuthorized() {
  return fetch(`${BASE_URL}/is-authorized`, { credentials: 'include' });
}
