// src/api/departmentApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
import createBaseQueryWithReauth from "./index";
const baseQueryWithReauth = createBaseQueryWithReauth(
  "http://127.0.0.1:8000/api/auth/"
);
export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Department"],
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => "departments/",
    }),
  }),
});
export const { useGetDepartmentsQuery } = departmentApi;
