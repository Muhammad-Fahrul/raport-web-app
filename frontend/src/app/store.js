import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../pages/auth/redux/authSlice';
import userReducer from '../pages/user/redux/userSlice';
import { apiSlice } from './api/apiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
