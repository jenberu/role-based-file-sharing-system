// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/auth';
import themeReducer from '../features/themeSlice'
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
