import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
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

setupListeners(store.dispatch);

export default store;
