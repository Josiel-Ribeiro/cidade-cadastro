import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

interface IDrawerOptions {
  patch: string;
  icon: string;
  label: string;
}

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toogleDrawerOpen: () => void;
  drawerOptions: IDrawerOptions[];
  setDraweroptions:(newDrawerOptions: IDrawerOptions[]) =>void
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => useContext(DrawerContext);

export const AppDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isDrawerOpen, setIsDraweropen] = useState(false);
  const [drawerOptions, setDraweroptions] = useState<IDrawerOptions[]>([]);

  const toogleDrawerOpen = useCallback(() => {
    setIsDraweropen((olDrawerOpen) => !olDrawerOpen);
  }, []);
  const handleSetDraweOptions = useCallback(
    (newDrawerOptions: IDrawerOptions[]) => {
      setDraweroptions(newDrawerOptions);
    },
    []
  );

  return (
    <DrawerContext.Provider
      value={{ isDrawerOpen, toogleDrawerOpen, drawerOptions,setDraweroptions:handleSetDraweOptions }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
