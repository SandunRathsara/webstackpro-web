import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TODO_TAG_CONFIG } from "@/features/todo/api/todo.tags";

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  tagTypes: [...TODO_TAG_CONFIG],
  endpoints: () => ({}),
  reducerPath: "webstackpro-reducer",
});

export default api;
