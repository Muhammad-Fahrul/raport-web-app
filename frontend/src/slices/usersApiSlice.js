import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
      invalidatesTags: ["Student"],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getRaport: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/raports/${id}`,
        method: "GET",
      }),
      providesTags: ["Raport"],
    }),
    getTopStudents: builder.query({
      query: () => ({
        url: `${USERS_URL}/rank`,
        method: "GET",
      }),
      providesTags: ["Raport"],
    }),
    getAudioRaport: builder.query({
      query: (id) => ({
        url: `https://equran.id/api/v2/surat/${id}`,
        method: "GET",
      }),
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
