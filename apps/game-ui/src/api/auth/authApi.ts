import {
  LoginRequestBody,
  Methods,
  SignUpRequestBody,
} from '@eurovision-game-monorepo/types';
import { baseApi } from '../baseApi';
import { endpoints } from '../../paths';

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    isAuthenticated: build.query({
      query: () => 'auth/is-authenticated',
    }),
    signUp: build.mutation<void, SignUpRequestBody>({
      query: (body) => ({
        url: endpoints.signUp,
        method: Methods.POST,
        body,
      }),
    }),
    login: build.mutation<void, LoginRequestBody>({
      query: (body) => ({
        url: endpoints.login,
        method: Methods.POST,
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useIsAuthenticatedQuery, useLoginMutation, useSignUpMutation } =
  authApi;
