import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact } from "../models/contact.model";

//create api slice
export const api = createApi({
  reducerPath: "contacts", //optional
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["contacts"],
  //if not have any endpoints endpoints:builder=>({})
  endpoints: (builder) => ({
    contacts: builder.query<Contact[], void>({
      query: () => "/contacts",
      providesTags: ["contacts"],
    }),
    contact: builder.query<Contact, string>({
      query: (id) => `/contacts/${id}`,
      providesTags: ["contacts"],
    }),
    addContacts: builder.mutation<Contact, Partial<Contact>>({
      query: (contact) => ({
        url: `/contacts`,
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["contacts"],
    }),
    deleteContacts: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contacts"],
    }),
  }),
});

export const {
  useContactsQuery,
  useContactQuery,
  useAddContactsMutation,
  useDeleteContactsMutation,
} = api;
