import { FC, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  TextField,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useCreateTodoMutation } from "@/features/todo/api/todo.api";
import { Todo } from "@/features/todo/types/todo.type";

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddTodo: FC<Props> = (props) => {
  const [createTodo, { isLoading }] = useCreateTodoMutation();

  const [state, setState] = useState<{
    title: string | undefined;
    description: string | undefined;
    dueDate: Dayjs;
  }>({ dueDate: dayjs(new Date()), title: undefined, description: undefined });

  const onSubmit = () => {
    if (state.title !== undefined && state.description !== undefined) {
      const todo: Omit<Todo, "id" | "createdAt" | "completedAt" | "completed"> =
        {
          title: state.title,
          description: state.description,
          dueDate: state.dueDate.toDate(),
        };
      createTodo(todo).then(() => {
        props.onClose();
        setState({
          dueDate: dayjs(new Date()),
          title: undefined,
          description: undefined,
        });
      });
    } else alert("fill all the fields");
  };

  return (
    <Dialog open={props.open} fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: "2.1rem",
                height: "2.1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(35,239,0,0.5)",
                borderRadius: 100,
              }}
            >
              <Box
                sx={{
                  width: "1.5rem",
                  height: "1.5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(35,239,0,0.80)",
                  borderRadius: 100,
                }}
              >
                <AddIcon />
              </Box>
            </Box>
            <Typography>Add new To-Do</Typography>
          </Box>
          <IconButton onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          sx={{ marginTop: "1rem" }}
          fullWidth
          id={"title"}
          label={"Title"}
          onChange={(event) =>
            setState((state) => ({ ...state, title: event.target.value }))
          }
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          id={"description"}
          label={"Description"}
          onChange={(event) =>
            setState((state) => ({ ...state, description: event.target.value }))
          }
        />
        <DatePicker
          label={"Due Date"}
          value={state.dueDate}
          onChange={(value) =>
            setState((state) => ({
              ...state,
              dueDate: value || dayjs(new Date()),
            }))
          }
        />
      </DialogContent>
      <DialogActions>
        <Button
          startIcon={isLoading ? <CircularProgress size={15} /> : <AddIcon />}
          disabled={isLoading}
          onClick={onSubmit}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTodo;
