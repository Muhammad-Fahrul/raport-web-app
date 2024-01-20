import { apiSlice } from "./apiSlice";
const MENTOR_URL = "/api/mentors";

export const mentorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => ({
        url: `${MENTOR_URL}/students`,
        method: "GET",
      }),
      providesTags: ["Raport", "Student"],
    }),
    createStudent: builder.mutation({
      query: (data) => ({
        url: `${MENTOR_URL}/students`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Student"],
    }),
    createRaport: builder.mutation({
      query: (data) => ({
        url: `${MENTOR_URL}/students/${data.studentId}/raports`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Raport", id: arg.studentId },
        ["Student"],
      ],
    }),
    delRaport: builder.mutation({
      query: ({ raportId }) => ({
        url: `${MENTOR_URL}/students/raports/${raportId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Raport", id: arg.raportId },
        ["Student"],
      ],
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useCreateRaportMutation,
  useGetStudentsQuery,
  useDelRaportMutation,
} = mentorApiSlice;
