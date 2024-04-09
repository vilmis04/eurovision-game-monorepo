import { Methods } from '@eurovision-game-monorepo/types';
import { endpoints } from '../../paths';
import { TagTypes, baseApi } from '../baseApi';
import { GetGroupResponse } from './responses';
import { CreateGroupRequest } from './requests';

type TGroupParams = { id: number };

type TJoinGroupParams = { inviteCode: string };

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
    createGroup: build.mutation<number, CreateGroupRequest>({
      query: (body) => ({
        url: groupDomain.groups,
        method: Methods.POST,
        body,
        credentials: 'include',
      }),
      invalidatesTags: [TagTypes.GROUP],
    }),
    getGroup: build.query<GetGroupResponse[], TGroupParams>({
      query: ({ id }) => ({
        url: groupDomain.group.build(id),
        method: Methods.GET,
        credentials: 'include',
      }),
    }),
    deleteGroup: build.mutation<void, TGroupParams>({
      query: ({ id }) => ({
        url: groupDomain.deleteGroup.build(id),
        method: Methods.DELETE,
        credentials: 'include',
      }),
      invalidatesTags: [TagTypes.GROUP],
    }),
    createInvitationLink: build.mutation<string, TGroupParams>({
      query: ({ id }) => ({
        url: groupDomain.createInvitationLink.build(id),
        method: Methods.POST,
        credentials: 'include',
        responseHandler: 'text',
      }),
    }),
    joinGroup: build.mutation<void, TJoinGroupParams>({
      query: (body) => ({
        url: groupDomain.joinGroup.build(),
        method: Methods.POST,
        body,
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useCreateGroupMutation,
  useGetGroupQuery,
  useDeleteGroupMutation,
  useCreateInvitationLinkMutation,
  useJoinGroupMutation,
} = groupApi;
