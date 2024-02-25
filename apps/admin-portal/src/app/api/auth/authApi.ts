import { Methods } from '../../lib/types/global.types';
import { loginRequestBody } from './authApi.types';

const BASE_URL = process.env.BASE_SERVICE_URL;
const AUTH_PREFIX = '/api/auth';

export const getIsAuthenticated = async () => {
  return fetch(`${BASE_URL}${AUTH_PREFIX}/is-authorized`, {
    credentials: 'include',
  });
};

export const login = async (body: loginRequestBody) => {
  return fetch(`${BASE_URL}${AUTH_PREFIX}/login`, {
    method: Methods.POST,
    body: JSON.stringify(body),
  });
};
