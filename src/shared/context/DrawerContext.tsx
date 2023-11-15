import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toogleDrawerOpen: () => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => useContext(DrawerContext);

export const AppDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isDrawerOpen, setIsDraweropen] = useState(false);

  const toogleDrawerOpen = useCallback(() => {
    setIsDraweropen(olDrawerOpen => ! olDrawerOpen);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toogleDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};
