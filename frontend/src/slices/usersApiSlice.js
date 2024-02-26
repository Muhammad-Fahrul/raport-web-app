import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
      invalidatesTags: ['Student'],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    getRaport: builder.query({
      query: ({ studentId }) => `${USERS_URL}/raports/${studentId}`,
      providesTags: (result, error, arg) => [
        { type: 'Raport', id: arg.studentId },
        ...result.map((raport) => ({ type: 'Raport', id: raport._id })),
      ],
    }),
    getTopStudents: builder.query({
      query: () => ({
        url: `${USERS_URL}/rank`,
        method: 'GET',
      }),
      providesTags: ['Raport'],
    }),
    getAudioRaport: builder.query({
      query: ({ chap }) => `https://equran.id/api/v2/surat/${chap}`,
      transformResponse: (response, meta, arg) => {
        return response.data.ayat[arg.ver - 1].audio['05'];
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetRaportQuery,
  useGetTopStudentsQuery,
  useGetAudioRaportQuery,
} = userApiSlice;
