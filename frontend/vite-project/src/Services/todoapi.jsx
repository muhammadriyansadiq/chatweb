import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => '/http://localhost:8000/api/userdashboard',
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: '/http://localhost:8000/api/userdashboard',
        method: 'POST',
        body: todo,
      }),
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...todo }) => ({
        url: `/http://localhost:8000/api/userdashboard/${id}`,
        method: 'PUT',
        body: todo,
      }),
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/http://localhost:8000/api/userdashboard/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
