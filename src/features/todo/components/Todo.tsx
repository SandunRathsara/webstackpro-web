import React from "react";
import { Checkbox, Typography, Paper, Grid } from "@mui/material";

interface Props {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
  completeTodo: (id: number) => void;
}

export const Todo: React.FC<Props> = ({
  id,
  title,
  description,
  dueDate,
  completed,
  completedAt,
  createdAt,
  completeTodo,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        cursor: "pointer",
        padding: 2,
        borderBottom: "1px solid #ccc",
        ...(completed && {
          textDecoration: "line-through",
          opacity: 0.7,
        }),
        width: "100%",
      }}
    >
      <Grid container spacing={1}>
        <Grid item container xs={12}>
          <Grid item xs={6} sm={9}>
            <Typography variant="h6">{title}</Typography>
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
              checked={completed}
              disabled={completed}
              color="primary"
              onClick={() => completeTodo(id)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{description}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="caption">Created At:</Typography>
          <Typography variant="body2">{createdAt}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="caption">Due Date:</Typography>
          <Typography variant="body2">{dueDate}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="caption">Completed At:</Typography>
          <Typography variant="body2">{completedAt || ""}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Todo;
