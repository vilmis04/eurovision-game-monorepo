import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  LoginRequestBody as LoginRequestBody,
  Methods,
  SignUpRequestBody,
} from '@eurovision-game-monorepo/types';

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_SERVICE_URL || 'http://localhost:4300/api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<void, LoginRequestBody>({
      query: (body) => ({
        url: 'auth/login',
        body,
        method: Methods.POST,
      }),
    }),
    signUp: builder.mutation<void, SignUpRequestBody>({
      query: (body) => ({
        url: 'auth/sign-up',
        body,
        method: Methods.POST,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;
