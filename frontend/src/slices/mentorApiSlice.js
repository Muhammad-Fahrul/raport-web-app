import { apiSlice } from "./apiSlice";
const MENTOR_URL = "/api/mentors";

export const mentorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (data) => ({
        url: `${MENTOR_URL}/students`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Student"],
    }),
    getStudents: builder.query({
      query: () => ({
        url: `${MENTOR_URL}/students`,
        method: "GET",
      }),
      providesTags: ["Student"],
    }),
    createRaport: builder.mutation({
      query: (data) => ({
        url: `${MENTOR_URL}/students/raports`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Raport"],
    }),
    delRaport: builder.mutation({
      query: (data) => ({
        url: `${MENTOR_URL}/students/raports/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Raport"],
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useCreateRaportMutation,
  useGetStudentsQuery,
  useDelRaportMutation,
} = mentorApiSlice;
