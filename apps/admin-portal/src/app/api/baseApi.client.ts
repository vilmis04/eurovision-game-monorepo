import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  LoginRequestBody,
  Methods,
  SignUpRequestBody,
} from '@eurovision-game-monorepo/types';

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_SERVICE_URL || 'http://localhost:4300/api';

enum Resources {
  AUTH = 'auth',
}

export const baseApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    isAuthorized: builder.query<void, void>({
      query: () => ({
        url: `${Resources.AUTH}/is-authorized`,
        method: Methods.GET,
        credentials: 'include',
      }),
    }),
    login: builder.mutation<void, LoginRequestBody>({
      query: (body) => ({
        url: `${Resources.AUTH}/login`,
        body,
        method: Methods.POST,
        credentials: 'include',
      }),
    }),
  }),
});

export const { useLoginMutation } = baseApi;
