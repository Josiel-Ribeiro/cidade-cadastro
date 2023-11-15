import { Box, ThemeProvider } from "@mui/material";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { LightTheme } from "../themes";
import { DarkTheme } from "../themes/Dark";

interface IThemeContextData {
  themeName: "dark" | "light";
  toogleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

export const useContextTheme = () => useContext(ThemeContext);

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<"light" | "dark">("light");

  const toogleTheme = useCallback(() => {
    setThemeName((oldThemeName) =>
      oldThemeName === "dark" ? "light" : "dark"
    );
  }, []);

  const theme = useMemo(() => {
    return themeName === "light" ? LightTheme : DarkTheme;
  }, [themeName]);
  return (
    <ThemeContext.Provider value={{ themeName, toogleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width={'100vw'} height={'100vh'} bgcolor={theme.palette.background.default}>
            {children}
            </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
