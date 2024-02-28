'use server';

const BASE_URL = process.env.BASE_SERVICE_URL;
const AUTH_PREFIX = '/auth';

export const getIsAuthenticated = async () => {
  return fetch(`${BASE_URL}${AUTH_PREFIX}/is-authorized`, {
    credentials: 'include',
  });
};
