import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["invoices", "user"],
  endpoints: (builder) => ({}),
  keepUnusedDataFor: 600,
});

export default apiSlice;
