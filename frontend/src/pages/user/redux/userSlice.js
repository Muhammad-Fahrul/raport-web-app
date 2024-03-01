import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      username: '',
      phoneNumber: '',
      role: 'student',
    },
  },
  reducers: {
    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    rmUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, rmUser } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.user.user;
