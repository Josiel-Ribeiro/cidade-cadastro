import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";

import { Environment } from "../../environments";

interface IFerramentasDaListagem{
    textoDaBusca?:string
    mostrarInputBusca?:boolean
    aoMudarTextoDeBusca:(novotexto:string)=>void
    mostratBotaoNovo?:boolean
    textoBotaoNovo?:string
    aoClicarEmNovo:()=>void
}

export const FerramentasDaListagem = ({
aoMudarTextoDeBusca,
mostrarInputBusca = false,
textoDaBusca = "",
aoClicarEmNovo,
mostratBotaoNovo = true,
textoBotaoNovo = "Novo"
}:IFerramentasDaListagem) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: theme.spacing(5),
        marginX: 1,
        padding: 1,
        paddingX: 2,
        display: "flex",
        gap: 1,
        alignItems: "center",
      }}
      component={Paper}
    >
   { mostrarInputBusca && (
       <TextField 
       size="small" 
       placeholder={Environment.INPUT_DE_BUCAS}
       value={textoDaBusca}
       onChange={(e)=>aoMudarTextoDeBusca(e.target.value)}
       
       />
   )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          flex: 1,
        }}
      >
        {
            mostratBotaoNovo && (
                <Button onClick={aoClicarEmNovo}
          variant="contained"
          disableElevation
          endIcon={<Icon>add</Icon>}
          sx={{
            color: "primary",
            marginRight:theme.spacing(5)
          }}
        >
         {textoBotaoNovo}
        </Button>
            )
        }
      </Box>
    </Box>
  );
};
