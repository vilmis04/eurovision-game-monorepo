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
      query: () => endpoints.isAuthenticated,
    }),
    signUp: build.mutation<void, SignUpRequestBody>({
      query: (body) => ({
        url: endpoints.signUp,
        method: Methods.POST,
        body,
        credentials: 'include',
      }),
    }),
    login: build.mutation<void, LoginRequestBody>({
      query: (body) => ({
        url: endpoints.login,
        method: Methods.POST,
        body,
        credentials: 'include',
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: endpoints.logout,
        method: Methods.POST,
        credentials: 'include',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useIsAuthenticatedQuery, useLoginMutation, useSignUpMutation } =
  authApi;
