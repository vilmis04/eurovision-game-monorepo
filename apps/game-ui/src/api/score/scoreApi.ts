import {
  GetScoresResponse,
  Methods,
  UpdateScoreRequestBody,
} from '@eurovision-game-monorepo/types';
import { TagTypes, baseApi } from '../baseApi';
import { endpoints } from '../../paths';

const { scoreDomain } = endpoints;
const scoreApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getScores: builder.query<GetScoresResponse[], void>({
      query: () => ({
        url: scoreDomain.score,
        method: Methods.GET,
        credentials: 'include',
      }),
      providesTags: [TagTypes.SCORE],
    }),
    updateScore: builder.mutation<void, UpdateScoreRequestBody>({
      query: (body) => ({
        url: scoreDomain.score,
        method: Methods.PATCH,
        body,
        credentials: 'include',
      }),
      invalidatesTags: [TagTypes.SCORE],
    }),
  }),
});

export const { useGetScoresQuery, useUpdateScoreMutation } = scoreApi;
