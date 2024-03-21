import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const BASE_URL = process.env.BASE_URL || 'http://localhost:4300';
const BASE_URL = 'http://localhost:4300/api';

export enum TagTypes {
  GROUP = 'GROUP',
}

export const baseApi = createApi({
  tagTypes: Object.values(TagTypes),
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({}),
});
