import api from "@/util/api";
import { Todo } from "@/features/todo/types/todo.type";
import { MapKeysToString } from "@/util/types";
import { TODO_TAGS } from "@/features/todo/api/todo.tags";

const todoApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllTodos: build.query<MapKeysToString<Todo>[], {}>({
      query: () => ({
        url: "/todo",
        method: "GET",
      }),
      providesTags: [TODO_TAGS.GET_ALL_TODOS],
    }),

    completeTodo: build.mutation<
      MapKeysToString<Todo>[],
      { id: number; index: number }
    >({
      query: ({ id }) => ({
        url: `/todo/${id}/complete`,
        method: "PATCH",
      }),
      invalidatesTags: () => [TODO_TAGS.GET_ALL_TODOS],
      onQueryStarted: ({ id, index }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getAllTodos", {}, (draft) => {
            draft[index].completed = "true";
            draft[index].completedAt = new Date().toDateString();
          }),
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
  }),
});

export const { useGetAllTodosQuery, useCompleteTodoMutation } = todoApi;
