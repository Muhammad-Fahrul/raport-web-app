import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../../app/api/apiSlice';
const STUDENT_URL = '/api/students';

const studentsAdapter = createEntityAdapter({});

const initialState = studentsAdapter.getInitialState();

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentsWithRaports: builder.query({
      query: () => `${STUDENT_URL}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedStudents = responseData.students.map((student) => {
          student.id = student._id;
          return student;
        });
        return studentsAdapter.setAll(initialState, loadedStudents);
      },
      providesTags: (result, err, arg) => {
        if (result?.ids) {
          return [
            { type: 'Raport', id: 'LIST' },
            { type: 'User', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'User', id })),
          ];
        } else
          return [
            { type: 'Raport', id: 'LIST' },
            { type: 'User', id: 'LIST' },
          ];
      },
    }),
    addNewStudent: builder.mutation({
      query: (data) => ({
        url: `${STUDENT_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    deleteStudent: builder.mutation({
      query: ({ id }) => ({
        url: `${STUDENT_URL}`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
    }),
  }),
});

export const {
  useAddNewStudentMutation,
  useDeleteStudentMutation,
  useGetStudentsWithRaportsQuery,
} = studentApiSlice;

export const selectStudentsResult =
  studentApiSlice.endpoints.getStudentsWithRaports.select();

const selectStudentsData = createSelector(
  selectStudentsResult,
  (studentResult) => studentResult.data
);

export const {
  selectAll: selectAllStudent,
  selectById: selectStudentById,
  selectIds: selectStudentIds,
} = studentsAdapter.getSelectors(
  (state) => selectStudentsData(state) ?? initialState
);
