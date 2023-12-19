import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TODO_TAG_CONFIG } from "@/features/todo/api/todo.tags";
import { getSession } from "next-auth/react";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      headers.set("Authorization", `Bearer ${session?.token.accessToken}`);
      return headers;
    },
  }),
  tagTypes: [...TODO_TAG_CONFIG],
  endpoints: () => ({}),
  reducerPath: "webstackpro-reducer",
});

export default api;
