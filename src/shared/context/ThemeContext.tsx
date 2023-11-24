import { Box, ThemeProvider } from "@mui/material";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
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

const LOCAL_STORANGE_THEME = "theme_app"

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<"light" | "dark">("light");


  useEffect(()=>{
    const themeNameStorange = localStorage.getItem(LOCAL_STORANGE_THEME)
if(themeNameStorange === "dark" || themeNameStorange === "light"){
  setThemeName(themeNameStorange)
}else{
  setThemeName("light")
}
  },[])
  const toogleTheme = useCallback(() => {
    setThemeName((oldThemeName) =>{
     const newTheme =  oldThemeName === "dark" ? "light" : "dark";
     localStorage.setItem(LOCAL_STORANGE_THEME,newTheme)
     return newTheme
    }
      

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
