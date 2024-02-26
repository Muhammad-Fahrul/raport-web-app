import { apiSlice } from './apiSlice';
const MENTORS_URL = '/api/mentors';

export const mentorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewStudent: builder.mutation({
      query: (data) => ({
        url: `${MENTORS_URL}/students`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Student'],
    }),
    getAllStudent: builder.query({
      query: () => ({
        url: `${MENTORS_URL}/students`,
        method: 'GET',
      }),
      providesTags: ['Student'],
    }),
  }),
});

export const { useAddNewStudentMutation, useGetAllStudentQuery } =
  mentorApiSlice;
