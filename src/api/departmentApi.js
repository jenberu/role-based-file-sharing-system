// src/api/departmentApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
import createBaseQueryWithReauth from "./index";
const baseQueryWithReauth = createBaseQueryWithReauth(
  "https://rrbfs-backend-production.up.railway.app/api/auth/"
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
