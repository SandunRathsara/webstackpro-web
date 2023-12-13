import api from "@/util/api";
import { Todo } from "@/features/todo/types/todo.type";
import { MapKeysToString } from "@/util/types";

const todoApi = api.injectEndpoints({
  endpoints: (build) => ({
    /**
     * Get All Todos
     */
    getAllTodos: build.query<MapKeysToString<Todo>[], {}>({
      query: () => ({
        url: "/todo",
        method: "GET",
      }),
    }),

    /**
     * Mark a to-do as completed with optimistic update
     */
    completeTodo: build.mutation<
      MapKeysToString<Todo>[],
      { id: number; index: number }
    >({
      query: ({ id }) => ({
        url: `/todo/${id}/complete`,
        method: "PATCH",
      }),
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

    /**
     * Create a new to-do with pesimistic update
     */
    createTodo: build.mutation<
      MapKeysToString<Todo>,
      Omit<Todo, "id" | "createdAt" | "completedAt" | "completed">
    >({
      query: (todo) => ({
        url: "/todo",
        method: "POST",
        body: todo,
      }),
      onQueryStarted: async (todo, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(
          todoApi.util.updateQueryData("getAllTodos", {}, (draft) => {
            draft.unshift(data);
          }),
        );
      },
    }),

    /**
     * Delete a to-do optimistic update
     */
    deleteTodo: build.mutation<
      MapKeysToString<Todo>[],
      { id: number; index: number }
    >({
      query: ({ id }) => ({
        url: `/todo/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: ({ id, index }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getAllTodos", {}, (draft) => {
            draft.splice(index, 1);
          }),
        );

        queryFulfilled.catch(patchResult.undo);
      },
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useCompleteTodoMutation,
  useCreateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
