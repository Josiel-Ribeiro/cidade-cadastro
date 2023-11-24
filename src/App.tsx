import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./shared/routes";
import { AppThemeProvider } from "./shared/context/ThemeContext";
import {  MenuLateral } from "./shared/components";
import { AppDrawerProvider, AuthProvider } from "./shared/context";

export const App = () => {
  return (
    <AuthProvider>
    <AppThemeProvider>
   
      <AppDrawerProvider>
        <BrowserRouter>

          <MenuLateral>
            <AppRoutes />
          </MenuLateral>

        </BrowserRouter>
      </AppDrawerProvider>
   
    </AppThemeProvider>
    </AuthProvider>
  );
};

export default App;
