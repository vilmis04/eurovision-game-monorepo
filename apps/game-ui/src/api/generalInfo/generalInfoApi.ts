import { endpoints } from '../../paths';
import { baseApi } from '../baseApi';

export enum GameType {
  SEMI1 = 'semi1',
  SEMI2 = 'semi2',
  FINAL = 'final',
}

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
