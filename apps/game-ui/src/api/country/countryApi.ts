import { endpoints } from '../../paths';
import { baseApi } from '../baseApi';
import { Country, CountryQueryParams } from './countryApi.types';

const { countryDomain } = endpoints;
export const countryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCountries: build.query<Country[], CountryQueryParams>({
      query: (params) => ({
        url: countryDomain.countryList.build(params),
        credentials: 'include',
      }),
    }),
  }),
});

export const { useGetCountriesQuery } = countryApi;
