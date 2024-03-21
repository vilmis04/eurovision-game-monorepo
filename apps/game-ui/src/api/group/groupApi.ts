import { Methods } from '@eurovision-game-monorepo/types';
import { endpoints } from '../../paths';
import { TagTypes, baseApi } from '../baseApi';

type TGroupParams = { id: string };

const { groupDomain } = endpoints;

export const groupApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // TODO: define group type
    getGroups: build.query<unknown, void>({
      query: () => groupDomain.groups,
      providesTags: [TagTypes.GROUP],
    }),
    // TODO: define group request body type
    createGroup: build.mutation<void, unknown>({
      query: (body) => ({
        url: groupDomain.groups,
        method: Methods.POST,
        body,
        credentials: 'include',
      }),
      invalidatesTags: [TagTypes.GROUP],
    }),
    // TODO: define group type
    getGroup: build.mutation<TGroupParams, unknown>({
      query: ({ id }) => ({
        url: `${groupDomain.groups}/${id}`,
        credentials: 'include',
      }),
    }),
  }),
});
