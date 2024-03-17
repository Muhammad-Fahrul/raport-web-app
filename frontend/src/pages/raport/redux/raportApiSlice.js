import { apiSlice } from '../../../app/api/apiSlice';
const RAPORT_URL = '/api/raports';

export const raportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewRaport: builder.mutation({
      query: (data) => ({
        url: `${RAPORT_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Raport', id: 'LIST' }],
    }),
    deleteRaport: builder.mutation({
      query: ({ id }) => ({
        url: `${RAPORT_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Raport', id: arg.id }],
    }),
  }),
});

export const { useAddNewRaportMutation, useDeleteRaportMutation } =
  raportApiSlice;
