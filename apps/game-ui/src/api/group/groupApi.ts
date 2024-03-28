import { Methods } from '@eurovision-game-monorepo/types';
import { endpoints } from '../../paths';
import { TagTypes, baseApi } from '../baseApi';
import { GetGroupResponse } from './responses';
import { CreateGroupRequest } from './requests';

type TGroupParams = { name: string };

const { groupDomain } = endpoints;

export const groupApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getGroups: build.query<GetGroupResponse[], void>({
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
    getGroup: build.query<GetGroupResponse, TGroupParams>({
      query: ({ name }) => ({
        url: `${groupDomain.groups}/${name}`,
        method: Methods.GET,
        credentials: 'include',
      }),
    }),
  }),
});

export const { useGetGroupsQuery, useCreateGroupMutation, useGetGroupQuery } =
  groupApi;
