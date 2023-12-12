import { FC } from "react";
import { Box, Button, SxProps, Theme } from "@mui/material";
import {
  useCompleteTodoMutation,
  useGetAllTodosQuery,
} from "@/features/todo/api/todo.api";
import { Todo } from "@/features/todo/components/Todo";
import { useModeContext } from "@/util/theme";

const Home: FC = () => {
  const { data, isLoading, isFetching } = useGetAllTodosQuery({});
  const [completeTodo] = useCompleteTodoMutation();

  const { toggleMode } = useModeContext();

  return (
    <Box sx={styles.container}>
      <Box sx={styles.todo_container}>
        <Button fullWidth onClick={toggleMode}>
          Add
        </Button>
        {isLoading
          ? "Loading..."
          : data?.map((todo, index) => (
              <Todo
                key={todo.id}
                id={+todo.id}
                title={todo.title}
                description={todo.description}
                dueDate={todo.dueDate}
                completed={todo.completed === "true"}
                completedAt={todo.completedAt}
                createdAt={todo.createdAt}
                completeTodo={(id) => completeTodo({ id, index })}
              />
            ))}
      </Box>
    </Box>
  );
};

type Styles = {
  container: SxProps<Theme>;
  todo_container: SxProps<Theme>;
};

const styles: Styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "background.default",
    color: "text.primary",
    minHeight: "100vh",
    paddingY: "2rem",
  },
  todo_container: {
    display: "flex",
    flexDirection: "column",
    minWidth: "50vw",
    alignItems: "center",
    gap: 2,
  },
};

export default Home;
