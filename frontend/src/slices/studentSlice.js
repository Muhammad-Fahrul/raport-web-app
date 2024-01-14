import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: localStorage.getItem("students")
    ? JSON.parse(localStorage.getItem("students"))
    : [],
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
      localStorage.setItem("students", JSON.stringify(action.payload));
    },
    addStudent: (state, action) => {
      const newStudents = state.students.push(action.payload);
      localStorage.setItem("students", JSON.stringify(newStudents));
    },
    delStudent: (state, action) => {
      const filtered = state.students.filter(
        (student) => student._id !== action.payload.id
      );
      localStorage.setItem("students", JSON.stringify(filtered));
    },
  },
});

export const { setStudents, addStudent, delStudent } = studentSlice.actions;

export default studentSlice.reducer;
