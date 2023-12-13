import React from "react";
import { Checkbox, Typography, Paper, Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const Todo: React.FC<Props> = (props) => {
  return (
    <Paper
      elevation={3}
      sx={{
        cursor: "pointer",
        padding: 2,
        borderBottom: "1px solid #ccc",
        ...(props.completed && {
          textDecoration: "line-through",
          opacity: 0.7,
        }),
        width: "100%",
      }}
    >
      <Grid container spacing={1}>
        <Grid item container xs={12}>
          <Grid item xs={6} sm={9}>
            <Typography variant="h6">{props.title}</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={3}
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Checkbox
              checked={props.completed}
              disabled={props.completed}
              color="primary"
              onClick={() => props.completeTodo(props.id)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{props.description}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="caption">Created At:</Typography>
          <Typography variant="body2">{props.createdAt}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="caption">Due Date:</Typography>
          <Typography variant="body2">{props.dueDate}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="caption">
            {props.completed ? "Completed At:" : "Not Completed"}
          </Typography>
          <Typography variant="body2">{props.completedAt || ""}</Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <IconButton onClick={() => props.deleteTodo(props.id)}>
            <DeleteIcon
              sx={{
                color: "red",
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Todo;
