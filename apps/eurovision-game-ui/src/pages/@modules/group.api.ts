import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICreateGroupFormData, IGroup } from "@eurovision-game-monorepo/core";
import { HttpMethods } from "@eurovision-game-monorepo/core";
import { paths } from "apps/eurovision-game-ui/src/paths";
import { DeleteResult, InsertOneResult, UpdateResult, WithId } from "mongodb";

type TGroupIdParam = { id: string };
type TGetGroupsParams = { year: string };
type TGetGroupsResponse = WithId<IGroup>[] | null;
type TUpdateGroupRequest = {
	body: { members?: IGroup["members"]; name?: IGroup["name"] };
	id: string;
};

enum GroupTags {
	GROUPS = "GROUPS",
}

export const groupApi = createApi({
	reducerPath: "groupApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4200/api/" }),
	tagTypes: Object.values(GroupTags),
	endpoints: (builder) => ({
		createGroup: builder.mutation<
			InsertOneResult<IGroup>,
			Pick<ICreateGroupFormData, "name">
		>({
			query: ({ name }) => ({
				method: HttpMethods.POST,
				url: paths.groups,
				credentials: "include",
				body: { name },
			}),
			invalidatesTags: [GroupTags.GROUPS],
		}),

		deleteGroup: builder.mutation<DeleteResult, TGroupIdParam>({
			query: ({ id }) => ({
				url: `${paths.groups}/${id}`,
				method: HttpMethods.DELETE,
				credentials: "include",
			}),
			invalidatesTags: [GroupTags.GROUPS],
		}),

		getGroups: builder.query<TGetGroupsResponse, TGetGroupsParams>({
			query: ({ year }) => ({
				url: `${paths.groups}/all/${year}`,
				method: HttpMethods.GET,
				credentials: "include",
			}),
			providesTags: [GroupTags.GROUPS],
		}),

		updateGroup: builder.mutation<TGetGroupsResponse, TUpdateGroupRequest>({
			query: ({ body, id }) => ({
				url: `${paths.groups}/${id}`,
				method: HttpMethods.PUT,
				credentials: "include",
				body,
			}),
			invalidatesTags: [GroupTags.GROUPS],
		}),

		generateInvitationLink: builder.mutation<UpdateResult, TGroupIdParam>({
			query: ({ id }) => ({
				url: `${paths.groups}/invitation-link/${id}`,
				method: HttpMethods.POST,
				credentials: "include",
				responseHandler: "text",
			}),
		}),

		setGroupToJoin: builder.query<void, { token: string }>({
			query: ({ token }) => ({
				url: `${paths.joinGroup}/${token}`,
				method: HttpMethods.GET,
				credentials: "include",
			}),
		}),

		joinGroup: builder.mutation<void, void>({
			query: () => ({
				url: "groups/join-group",
				method: HttpMethods.POST,
				credentials: "include",
			}),
		}),
	}),
});

export const {
	useCreateGroupMutation,
	useDeleteGroupMutation,
	useGetGroupsQuery,
	useUpdateGroupMutation,
	useGenerateInvitationLinkMutation,
	useSetGroupToJoinQuery,
	useJoinGroupMutation,
} = groupApi;
