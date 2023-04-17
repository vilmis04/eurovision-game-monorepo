import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	GameTypes,
	IGetVotesResponse,
	IUpdateVotesRequest,
	TCountries,
} from "@eurovision-game-monorepo/core";
import { HttpMethods } from "@eurovision-game-monorepo/core";

type TGetVotesParams = { type: GameTypes; year: string };

enum TagTypes {
	VOTES = "VOTES",
}

export const votesApi = createApi({
	reducerPath: "votesApi",
	tagTypes: Object.values(TagTypes),
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4200/api/" }),
	endpoints: (builder) => ({
		getVotes: builder.query<TCountries, TGetVotesParams>({
			query: ({ type, year }) => ({
				url: `votes/${year}/${type}`,
				credentials: "include",
			}),
			providesTags: [TagTypes.VOTES],
		}),

		updateVotes: builder.mutation<IGetVotesResponse, IUpdateVotesRequest>({
			query: (requestBody) => ({
				url: "votes",
				method: HttpMethods.PATCH,
				body: requestBody,
				credentials: "include",
			}),
			invalidatesTags: [TagTypes.VOTES],
		}),
	}),
});

export const { useGetVotesQuery, useUpdateVotesMutation } = votesApi;
