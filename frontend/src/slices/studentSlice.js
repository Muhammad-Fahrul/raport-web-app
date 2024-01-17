import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  student: localStorage.getItem("student")
    ? JSON.parse(localStorage.getItem("student"))
    : {},
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudent: (state, action) => {
      state.student = action.payload;
      localStorage.setItem("student", JSON.stringify(action.payload));
    },
    deleteStudent: (state) => {
      state.student = null;
      localStorage.removeItem("student");
    },
  },
});

export const { setStudent, deleteStudent } = studentSlice.actions;

export default studentSlice.reducer;
