import { apiSlice } from './apiSlice';
const AUTH_URL = '/api/auth';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: 'POST',
      }),
      invalidatesTags: ['Student'],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
