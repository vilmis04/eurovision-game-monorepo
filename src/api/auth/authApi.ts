import { TagTypes, baseApi } from '../baseApi';
import { endpoints } from '../../paths';
import { Methods, SignUpRequestBody, LoginRequestBody } from '../../types';

const { authDomain } = endpoints;

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    isAuthenticated: build.query<string, void>({
      query: () => ({
        url: authDomain.isAuthenticated,
        method: Methods.GET,
        credentials: 'include',
        providesTags: [TagTypes.AUTHORISED],
        responseHandler: 'text',
      }),
    }),
    signUp: build.mutation<void, SignUpRequestBody>({
      query: (body) => ({
        url: authDomain.signUp,
        method: Methods.POST,
        body,
        credentials: 'include',
        invalidatesTags: [TagTypes.AUTHORISED],
      }),
    }),
    login: build.mutation<void, LoginRequestBody>({
      query: (body) => ({
        url: authDomain.login,
        method: Methods.POST,
        body,
        credentials: 'include',
        invalidatesTags: [TagTypes.AUTHORISED],
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: authDomain.logout,
        method: Methods.POST,
        credentials: 'include',
        invalidatesTags: Object.values(TagTypes),
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useIsAuthenticatedQuery,
  useLazyIsAuthenticatedQuery,
  useLoginMutation,
  useSignUpMutation,
  useLogoutMutation,
} = authApi;
