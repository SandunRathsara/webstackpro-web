import { Theme, useTheme } from "@mui/material";

export default function useStyles<T>(createStyles: (theme: Theme) => T): {
  styles: T;
  theme: Theme;
} {
  const theme = useTheme();
  return { styles: createStyles(theme), theme };
}
