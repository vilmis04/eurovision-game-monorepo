import {
  LoginRequestBody,
  Methods,
  SignUpRequestBody,
} from '@eurovision-game-monorepo/types';
import { baseApi } from '../baseApi';
import { endpoints } from '../../paths';

const { authDomain } = endpoints;

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    isAuthenticated: build.query({
      query: () => authDomain.isAuthenticated,
    }),
    signUp: build.mutation<void, SignUpRequestBody>({
      query: (body) => ({
        url: authDomain.signUp,
        method: Methods.POST,
        body,
        credentials: 'include',
      }),
    }),
    login: build.mutation<void, LoginRequestBody>({
      query: (body) => ({
        url: authDomain.login,
        method: Methods.POST,
        body,
        credentials: 'include',
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: authDomain.logout,
        method: Methods.POST,
        credentials: 'include',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useIsAuthenticatedQuery, useLoginMutation, useSignUpMutation } =
  authApi;
