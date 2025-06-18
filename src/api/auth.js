// src/api/authApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import createBaseQueryWithReauth from './index';

const baseQueryWithReauth = createBaseQueryWithReauth(
  'http://127.0.0.1:8000/api/auth'
);

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login/',
        method: 'POST',
        body: credentials,
      }),
    }),

    register: builder.mutation({
      query: (body) => ({
        url: '/register/',
        method: 'POST',
        body,
      }),
    }),

    getMe: builder.query({
      query: () => ({
        url: '/me/',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/logout/',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useLogoutMutation,
} = authApi;
