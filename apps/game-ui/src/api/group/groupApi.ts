import { Methods } from '@eurovision-game-monorepo/types';
import { endpoints } from '../../paths';
import { TagTypes, baseApi } from '../baseApi';
import { GetGroupsResponse } from './responses';
import { CreateGroupRequest } from './requests';

type TGroupParams = { id: string };

const { groupDomain } = endpoints;

export const groupApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getGroups: build.query<GetGroupsResponse[], void>({
      query: () => ({
        url: groupDomain.groups,
        method: Methods.GET,
        credentials: 'include',
      }),
      providesTags: [TagTypes.GROUP],
    }),
    createGroup: build.mutation<void, CreateGroupRequest>({
      query: (body) => ({
        url: groupDomain.groups,
        method: Methods.POST,
        body,
        credentials: 'include',
      }),
      invalidatesTags: [TagTypes.GROUP],
    }),
    // TODO: define group type
    getGroup: build.query<TGroupParams, unknown>({
      query: ({ id }) => ({
        url: `${groupDomain.groups}/${id}`,
        credentials: 'include',
      }),
    }),
  }),
});

export const { useGetGroupsQuery, useCreateGroupMutation, useGetGroupQuery } =
  groupApi;
