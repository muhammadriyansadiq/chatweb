import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => 'userdashboard',
    }),
    createDashboard: builder.mutation({
      query: (newDashboard) => ({
        url: 'userdashboard',
        method: 'POST',
        body: newDashboard,
      }),
    }),
    updateDashboard: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `userdashboard/${id}`,
        method: 'PUT',
        body: rest,
      }),
    }),
    deleteDashboard: builder.mutation({
      query: (id) => ({
        url: `userdashboard/${id}`,
        method: 'DELETE',
      }),
    }),
   
  }),
});

export const {
  useGetDashboardQuery,
  useCreateDashboardMutation,
  useUpdateDashboardMutation,
  useDeleteDashboardMutation,

} = api;
