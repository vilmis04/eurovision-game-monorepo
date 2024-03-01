import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Methods } from '../../../../../../libs/types/src/global/global.types';
import { ILoginRequestBody } from '@eurovision-game-monorepo/types';

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_SERVICE_URL || 'http://localhost:4300/api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<void, ILoginRequestBody>({
      query: (body) => {
        console.log(BASE_URL);
        return {
          url: 'auth/login',
          body,
          method: Methods.POST,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
