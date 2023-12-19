import { createSlice } from "@reduxjs/toolkit";

export const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    value: null,
  },
  reducers: {
    loginTeacher: (state, action) => {
      state.teacher = action.payload;
    },
    logout: (state) => {
      state.teacher = null;
    },
  },
});

export const { loginTeacher, logout } = teacherSlice.actions;
export const selectTeacher = (state) => state.teacher.teacher;
export default teacherSlice.reducer;
