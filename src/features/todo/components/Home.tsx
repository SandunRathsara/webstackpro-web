import { FC, useState, MouseEvent } from "react";
import {
  Box,
  Button,
  SxProps,
  Theme,
  IconButton,
  Paper,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  useCompleteTodoMutation,
  useDeleteTodoMutation,
  useGetAllTodosQuery,
} from "@/features/todo/api/todo.api";
import { Todo } from "@/features/todo/components/Todo";
import { useModeContext } from "@/util/theme";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AddIcon from "@mui/icons-material/Add";
import AddTodo from "@/features/todo/components/AddTodo";
import { signOut, useSession } from "next-auth/react";
import { keycloakLogout } from "@/util/auth/keycloakLogout";

const Home: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data, isLoading } = useGetAllTodosQuery({});
  const [completeTodo] = useCompleteTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const { toggleMode, mode } = useModeContext();

  const [showAddNewTodoModal, setShowAddNewTodoModal] =
    useState<boolean>(false);

  const { data: session } = useSession();

  const openMenu = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  return (
    <>
      <Box sx={styles.container}>
        <Box sx={styles.todo_container}>
          <Paper sx={styles.action_buttons}>
            <IconButton onClick={toggleMode}>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Button
                startIcon={<AddIcon />}
                onClick={() => setShowAddNewTodoModal(true)}
              >
                Add New
              </Button>
              <Box
                sx={{ height: "2.2rem" }}
                component={"img"}
                src={`https://api.dicebear.com/7.x/micah/svg?seed=${session?.user?.name}&&facialHair[]`}
              />
              <Box sx={{ cursor: "pointer" }} onClick={openMenu}>
                <Typography>{session?.user?.name}</Typography>
                <Typography>{session?.user?.email}</Typography>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={() => {
                  setAnchorEl(null);
                  setIsMenuOpen(false);
                }}
              >
                <MenuItem
                  onClick={() => {
                    signOut();
                    keycloakLogout(session?.token.idToken || "");
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Paper>
          {isLoading
            ? "Loading..."
            : (data?.length || 0) > 0
              ? data?.map((todo, index) => (
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
                    deleteTodo={(id) => deleteTodo({ id, index })}
                  />
                ))
              : "No Data"}
        </Box>
      </Box>
      <AddTodo
        open={showAddNewTodoModal}
        onClose={() => setShowAddNewTodoModal(false)}
      />
    </>
  );
};

type Styles = {
  container: SxProps<Theme>;
  todo_container: SxProps<Theme>;
  action_buttons: SxProps<Theme>;
};

const styles: Styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
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
  action_buttons: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    paddingY: "0.5rem",
    paddingX: "1rem",
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
};

export default Home;
