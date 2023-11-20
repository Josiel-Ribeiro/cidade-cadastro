import { Box, Button, Divider, Icon,   Paper,   Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useMemo, useState } from "react";


interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoDeSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;

  
  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoDeSalvarCarregando?: boolean;
  mostrarBotaoSalvarEFecharCarregando?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmSalvarEFechar?: () => void;
}



export const FerramentasDeDetalhe = ({
  textoBotaoNovo = "Novo",
  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoDeSalvar = true,
  mostrarBotaoSalvarEFechar = false,

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoApagarCarregando =  false,
  mostrarBotaoDeSalvarCarregando =  false,
  mostrarBotaoSalvarEFecharCarregando =  false,

  aoClicarEmApagar,
  aoClicarEmNovo,
  aoClicarEmSalvar,
  aoClicarEmSalvarEFechar,
  aoClicarEmVoltar,
}: IFerramentasDeDetalheProps) => {
  const theme = useTheme();
  const smDawn = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDawn = useMediaQuery(theme.breakpoints.down('md'))

  const [open, setOpen] = useState(false)
  const [pixes, setPixes] = useState(34)

  const heigth = useMemo(()=>{
    return open?3:0
  },[open])

  return (
    <Box
      sx={{
        height: theme.spacing(5),
        marginX: 1,
        padding: 1,
        paddingX: 2,
        display: "flex",
        gap: 3,
        alignItems: "center",
      }}
      component={Paper}
    >
     {
      (mostrarBotaoDeSalvar && !mostrarBotaoDeSalvarCarregando) &&
      <Button
      onClick={aoClicarEmSalvar}
      variant="contained"
      disableElevation
      startIcon={<Icon>save</Icon>}
      sx={{
        color: "primary",
      }}
    >
      <Typography variant="button" sx={{
        whiteSpace:"nowrap",
        textOverflow:"ellipsis",
        overflow:"hidden"
      }}>
      Salvar
      </Typography>
     
    </Button>
     }
     {
      mostrarBotaoDeSalvarCarregando && (
        <Skeleton sx={{
          width:110,
          height:60
         }}/>
    
      )
     }
     {
      (mostrarBotaoNovo  && !mostrarBotaoNovoCarregando)  &&  (
        <Button
        onClick={aoClicarEmNovo}
        variant="outlined"
        disableElevation
        startIcon={<Icon>add</Icon>}
        sx={{
          color: "primary",
        }}
      >
        <Typography variant="button" sx={{
        whiteSpace:"nowrap",
        textOverflow:"ellipsis",
        overflow:"hidden"
      }}>
      {textoBotaoNovo}
      </Typography>
      </Button>
      )
     }
      
     {
      mostrarBotaoNovoCarregando  && (
        <Skeleton sx={{
          width:110,
          height:60
         }}/>
      )
     }

      {
        (!smDawn && !mdDawn && mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando) && (
          <Button
          onClick={aoClicarEmSalvarEFechar}
        variant="outlined"
        disableElevation
        startIcon={<Icon>save</Icon>}
        sx={{
          color: "primary",
        }}
      >
        <Typography variant="button" sx={{
        whiteSpace:"nowrap",
        textOverflow:"ellipsis",
        overflow:"hidden"
      }}>
      Salvar e fechar
      </Typography>
      </Button>
        )
      }


       {
        !smDawn && !mdDawn &&  mostrarBotaoSalvarEFecharCarregando  && (
          <Skeleton sx={{
            width:190,
            height:60
           }}/>
        )
       }

      {
        (mostrarBotaoApagar && !mostrarBotaoApagarCarregando)&& (
          <Button
          onClick={aoClicarEmApagar}
          variant="outlined"
          disableElevation
          startIcon={<Icon>delete</Icon>}
          sx={{
            color: "primary",
          }}
        >
      <Typography variant="button" sx={{
        whiteSpace:"nowrap",
        textOverflow:"ellipsis",
        overflow:"hidden"
      }}>
      Apagar
      </Typography>
        </Button>
        )
      }
     

     {
      mostrarBotaoApagarCarregando  && (
        <Skeleton sx={{
          width:130,
          height:60
         }}/>
      )
     }

    { smDawn && (  <Divider variant="middle" orientation="vertical" />)}

   {

    (mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando)  && (
      <Button
      onClick={aoClicarEmVoltar}
      variant="outlined"
      disableElevation
      startIcon={<Icon>arrow_back</Icon>}
      sx={{
        color: "primary",
      }}
    >
     <Typography variant="button" sx={{
        whiteSpace:"nowrap",
        textOverflow:"ellipsis",
        overflow:"hidden"
      }}>
      Voltar
      </Typography>
    </Button>
    )
   }

{
  mostrarBotaoVoltarCarregando  && (
    <Skeleton sx={{
      width:120,
      height:60
     }}/>
  )
}



    </Box>
  );
};


