
import { Route, Routes, Navigate } from "react-router-dom";

import { useDrawerContext } from "../context";
import { useEffect } from "react";
import { Dashboard, DetalheDeCidades, DetalheDePesoas, ListagemDeCidades, ListagemDePessoas } from "../pages";

export const AppRoutes = () => {
    const {  setDraweroptions } = useDrawerContext();

    useEffect(() => {
        setDraweroptions([
            { label: "Pagina Inicial", icon: "home", patch: "/pagina-inicial" },
            { label: "Cidades", icon: "location_city", patch: "/cidades" },
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
            <Route path="/pessoas/detalhe/:id" element={<DetalheDePesoas/>}/>

            <Route path="/cidades" element={<ListagemDeCidades/>}/>
            <Route path="/cidades/detalhe/:id" element={<DetalheDeCidades/>}/>
            
            <Route path="*" element={<Navigate to={"/pagina-inicial"} />} />
        </Routes>
    );
};
