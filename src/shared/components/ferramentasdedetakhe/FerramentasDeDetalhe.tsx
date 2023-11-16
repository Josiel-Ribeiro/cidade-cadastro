import { Box, Button, Divider, Icon, Paper, useTheme } from "@mui/material";

export const FerramentasDeDetalhe = () => {
  const theme = useTheme();

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
      <Button
        variant="contained"
        disableElevation
        startIcon={<Icon>save</Icon>}
        sx={{
          color: "primary",
        
        }}
      >
        Salvar
      </Button>

      <Button
        variant="outlined"
        disableElevation
        startIcon={<Icon>save</Icon>}
        sx={{
          color: "primary",
     
        }}
      >
        Salvar e voltar
      </Button>

      <Button
        variant="outlined"
        disableElevation
        startIcon={<Icon>delete</Icon>}
        sx={{
          color: "primary",
         
        }}
      >
        Apagar
      </Button>

      <Button
        variant="outlined"
        disableElevation
        startIcon={<Icon>add</Icon>}
        sx={{
          color: "primary",
         
        }}
      >
        Novo
      </Button>

    <Divider variant="middle" orientation="vertical"/>

      <Button
          variant="outlined"
        disableElevation
        startIcon={<Icon>arrow_back</Icon>}
        sx={{
          color: "primary",
     
        }}
      >
        Voltar
      </Button>
    </Box>
  );
};
