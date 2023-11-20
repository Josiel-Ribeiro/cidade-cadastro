
import { Route, Routes, Navigate } from "react-router-dom";

import { useDrawerContext } from "../context";
import { useEffect } from "react";
import { Dashboard, ListagemDePessoas } from "../pages";

export const AppRoutes = () => {
    const {  setDraweroptions } = useDrawerContext();

    useEffect(() => {
        setDraweroptions([
            { label: "Pagina Inicial", icon: "home", patch: "/pagina-inicial" },
            { label: "Pessoas", icon: "people", patch: "/pessoas" },
          
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

            <Route path="/pessoas" element={<ListagemDePessoas/>}/>
            
            <Route path="*" element={<Navigate to={"/pagina-inicial"} />} />
        </Routes>
    );
};
