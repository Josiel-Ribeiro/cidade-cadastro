
import {  FerramentasDeDetalhe } from "../../components";
import { LayoutBaseDePagina } from "../../layouts";

export const Dashboard = () => {


  return (
    <LayoutBaseDePagina
      titulo="Pagina inicial"
      BarraDeFerramentas={
     <FerramentasDeDetalhe mostrarBotaoSalvarEFechar />
      }
    >
      testeando
    </LayoutBaseDePagina>
  );
};
