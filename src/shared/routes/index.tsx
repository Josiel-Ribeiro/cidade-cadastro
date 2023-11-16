
import { Route, Routes, Navigate } from "react-router-dom";

import { useDrawerContext } from "../context";
import { useEffect } from "react";
import { Dashboard } from "../pages";

export const AppRoutes = () => {
    const {  setDraweroptions } = useDrawerContext();

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
                <Dashboard/>
                }
            />
            
            <Route path="*" element={<Navigate to={"/pagina-inicial"} />} />
        </Routes>
    );
};
