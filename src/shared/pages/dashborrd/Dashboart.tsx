import { useState } from "react";
import { FerramentasDaListagem } from "../../components";
import { LayoutBaseDePagina } from "../../layouts";

export const Dashboard = () => {
  const [texto, setTexto] = useState();

  return (
    <LayoutBaseDePagina
      titulo="Pagina inicial"
      BarraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoDaBusca={texto}
          aoMudarTextoDeBusca={() => setTexto}
          aoClicarEmNovo={() => setTexto}
        />
      }
    >
      testeando
    </LayoutBaseDePagina>
  );
};
