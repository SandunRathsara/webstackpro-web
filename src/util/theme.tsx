import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

const ModeContext = createContext<{
  mode: "light" | "dark";
  toggleMode: () => void;
}>({ mode: "light", toggleMode: () => {} });

export const useModeContext = () => {
  return useContext(ModeContext);
};

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setTheme] = useState<"light" | "dark">("light");
  const MuiTheme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ModeContext.Provider
      value={{
        mode,
        toggleMode: () =>
          setTheme((state) => (state === "light" ? "dark" : "light")),
      }}
    >
      <MUIThemeProvider theme={MuiTheme}>{children}</MUIThemeProvider>
    </ModeContext.Provider>
  );
};
