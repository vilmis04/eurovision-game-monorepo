import { GameType } from '@eurovision-game-monorepo/types';
import { endpoints } from '../../paths';
import { baseApi } from '../baseApi';

interface GeneralInfoResponse {
  year: number;
  gameType: GameType;
  isVotingActive: boolean;
  votingEnd?: Date;
}

const { generalInfoDomain } = endpoints;
export const generalInfoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getGeneralInfo: build.query<GeneralInfoResponse, void>({
      query: () => ({
        url: generalInfoDomain.admin,
        credentials: 'include',
      }),
    }),
  }),
});

export const { useGetGeneralInfoQuery } = generalInfoApi;
