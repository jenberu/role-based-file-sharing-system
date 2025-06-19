import { createApi } from "@reduxjs/toolkit/query/react";
import createBaseQueryWithReauth from "./index";
const baseQueryWithReauth = createBaseQueryWithReauth(
  "http://127.0.0.1:8000/api/documents/"
);
export const documentApi = createApi({
  reducerPath: "documentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Document"],
  endpoints: (builder) => ({
    // GET all documents
    getDocuments: builder.query({
      query: () => "",
      providesTags: ["Document"],
    }),

    // GET single document by ID
    getDocument: builder.query({
      query: (id) => `${id}/`,
      providesTags: (result, error, id) => [{ type: "Document", id }],
    }),

    // POST new document
    uploadDocument: builder.mutation({
      query: (formData) => ({
        url: "upload/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Document"],
    }),

    // PATCH update existing document
    editDocument: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${id}/edit/`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Document",
        { type: "Document", id },
      ],
    }),

    deleteDocuments: builder.mutation({
      query: (ids) => ({
        url: "/delete/",
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["Document"],
    }),
    getTotalDocuments: builder.query({
      query: () => "/total-documents/",
      providesTags: ["Document"],
    }),
  }),
});

export const {
  useGetDocumentsQuery,
  useGetDocumentQuery,
  useUploadDocumentMutation,
  useEditDocumentMutation,
  useDeleteDocumentsMutation,
  useGetTotalDocumentsQuery,
} = documentApi;
