import { GameType } from '@eurovision-game-monorepo/types';
import { endpoints } from '../../paths';
import { baseApi } from '../baseApi';

interface Country {
  name: string;
  code: string;
  year: number;
  gameType: GameType;
  score: number;
  isInFinal: boolean;
  artist: string;
  song: string;
  orderSemi: number;
  orderFinal: number;
}

type CountryQueryParams = {
  gameType?: GameType;
  name?: string;
  year: number;
};

// const {} = endpoints;
export const countryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCountries: build.query<Country[], CountryQueryParams>({
      query: ({ gameType, name, year }) => ({
        url: `/country/${year}?gameType=semi1`,
        credentials: 'include',
      }),
    }),
  }),
});

export const { useGetCountriesQuery } = countryApi;
