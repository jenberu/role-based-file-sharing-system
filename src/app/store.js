// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/auth";
import { departmentApi } from "../api/departmentApi";
import { documentApi } from "../api/fileApi";
import themeReducer from "../features/themeSlice";
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [documentApi.reducerPath]: documentApi.reducer,

    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      departmentApi.middleware,
      documentApi.middleware
    ),
});
