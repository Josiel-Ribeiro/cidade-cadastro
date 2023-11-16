import { useState } from "react";
import { FerramentasDaListagem, FerramentasDeDetalhe } from "../../components";
import { LayoutBaseDePagina } from "../../layouts";

export const Dashboard = () => {
  const [texto, setTexto] = useState();

  return (
    <LayoutBaseDePagina
      titulo="Pagina inicial"
      BarraDeFerramentas={
     <FerramentasDeDetalhe/>
      }
    >
      testeando
    </LayoutBaseDePagina>
  );
};
