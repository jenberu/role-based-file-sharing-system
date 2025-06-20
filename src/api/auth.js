// src/api/authApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
import createBaseQueryWithReauth from "./index";

const baseQueryWithReauth = createBaseQueryWithReauth(
  "http://127.0.0.1:8000/api/auth"
);

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login/",
        method: "POST",
        body: credentials,
      }),
    }),

    register: builder.mutation({
      query: (body) => ({
        url: "/register/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    getMe: builder.query({
      query: () => ({
        url: "/me/",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/users/",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout/",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: "change-password/",
        method: "POST",
        body,
      }),
    }),
    getTotalUsers: builder.query({
      query: () => "/total-users/",
      providesTags: ["User"],
    }),
    deleteUsers: builder.mutation({
      query: (userIds) => ({
        url: "/delete-users/",
        method: "DELETE",
        body: { ids: userIds },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useLogoutMutation,
  useGetUsersQuery,
  useChangePasswordMutation,
  useGetTotalUsersQuery,
  useDeleteUsersMutation,

} = authApi;
