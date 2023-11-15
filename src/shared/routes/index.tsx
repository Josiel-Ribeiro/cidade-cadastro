import { Button } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";

import { useDrawerContext } from "../context";
import { useEffect } from "react";

export const AppRoutes = () => {
    const { toogleDrawerOpen, setDraweroptions } = useDrawerContext();

    useEffect(() => {
        setDraweroptions([
            { label: "Pagina Inicial", icon: "home", patch: "/pagina-inicial" },
          
        ]);
    }, []);

    return (
        <Routes>
            <Route
                path="/pagina-inicial"
                element={
                    <Button
                        onClick={toogleDrawerOpen}
                        variant="contained"
                        color="primary"
                    >
                        Toggle Menu
                    </Button>
                }
            />
            
            <Route path="*" element={<Navigate to={"/pagina-inicial"} />} />
        </Routes>
    );
};
