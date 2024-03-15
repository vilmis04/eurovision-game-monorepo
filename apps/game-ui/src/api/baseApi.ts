import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const BASE_URL = process.env.BASE_URL || 'http://localhost:4300';
const BASE_URL = 'http://localhost:4300';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({}),
});
