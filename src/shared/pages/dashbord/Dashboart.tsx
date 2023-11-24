
import { Navigate } from "react-router-dom";
import {  FerramentasDaListagem, FerramentasDeDetalhe } from "../../components";
import { LayoutBaseDePagina } from "../../layouts";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CidadesServices } from "../../services/api/cidades/CidadesServices";
import { PessoaServices } from "../../services/api/pessoas/PessoasServices";

export const Dashboard = () => {

  const [isLoadingCidades, setIsLoadingCidades] = useState(true);
  const [totalCountCidades, setTotalCountCidades] = useState(0);
  const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
  const [totalCountPessoas, setTotalCountPessoas] = useState(0);



  useEffect(() => {
    setIsLoadingCidades(true);
    setIsLoadingPessoas(true);
    
      CidadesServices.getAll(1)
      .then((result) => {
        setIsLoadingCidades(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);

          setTotalCountCidades(result.totalCount);
         
        }
      });


      PessoaServices.getAll(1)
      .then((result) => {
        setIsLoadingPessoas(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);

          setTotalCountPessoas(result.totalCount);
         
        }
      });
    
  }, []);



  return (
    <LayoutBaseDePagina
      titulo="Pagina inicial"
      BarraDeFerramentas={
     <FerramentasDaListagem mostratBotaoNovo aoMudarTextoDeBusca={function (novotexto: string): void {
          throw new Error("Function not implemented.");
        } } aoClicarEmNovo={function (): void {
          throw new Error("Function not implemented.");
        } } />
      }
    >
      <Box 
      sx={{
        width:'100%',
        display:"flex",
      }}
      >
        <Grid container margin={2}>
          <Grid item container spacing={2}>

             <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <Card>
                 <CardContent>
                  <Typography variant="h5" align="center">
                    Total de pessoas
                  </Typography>


                  <Box display={'flex'} padding={6} justifyContent={'center'} alignItems={'center'}>
                  {!isLoadingPessoas && (
                   <Typography variant="h1">
                   {totalCountPessoas}
            </Typography>
               )}
                   
                     { isLoadingPessoas &&(
                       <Typography variant="h6">
                           Carregando...
                           </Typography>
                     )}
                    
                  </Box>
                 </CardContent>
                  </Card>
             </Grid>

             <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
             <Card>
             <CardContent>
                  <Typography variant="h5" align="center">
                    Total de cidades
                  </Typography>


                  <Box display={'flex'} padding={6} justifyContent={'center'} alignItems={'center'}>
               {!isLoadingCidades && (
                   <Typography variant="h1">
                   {totalCountCidades}
            </Typography>
               )}
                   
                     { isLoadingCidades &&(
                       <Typography variant="h6">
                           Carregando...
                           </Typography>
                     )}
                    
                  </Box>
                 </CardContent>
                  </Card>
             </Grid>


          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};
