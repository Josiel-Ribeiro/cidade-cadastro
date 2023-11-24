/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../layouts";
import { FerramentasDeDetalhe } from "../../components";
import { useEffect, useState } from "react";
import { CidadesServices } from "../../services/api/cidades/CidadesServices";
import { VTextField,VForm,useVForm, IVFormsErros } from "../../forms";
import * as yup from 'yup'

import { Box, Grid, LinearProgress, Paper, TextField, Typography } from "@mui/material";
import { Form } from "react-hook-form";


interface IFormData {
  nome: string;
}



const formValidationSchema:yup.Schema<IFormData>= yup.object().shape({
  nome:yup.string().required().min(3),

  })

export const DetalheDeCidades = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const {formRef,save,saveAndClose,isSaveAndClose} = useVForm()

  const [isLoading, setIsloading] = useState(false);
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (id !== "nova") {
      setIsloading(true);
      CidadesServices.getByld(Number(id)).then((result) => {
        setIsloading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate("/cidades");
        } else {
          setNome(result.nome);
          formRef.current?.setData(result);
        }
      });
    }else{
      formRef.current?.setData({
        nome:"",
       
      })
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {


formValidationSchema.
validate(dados,{abortEarly:false})
.then((dadosValidados)=>{
  setIsloading(true);
    
  if (id === "nova") {
    CidadesServices.create(dadosValidados).then((result) => {
      setIsloading(false);
      if (result instanceof Error) {
        alert(result.message);
      } 
      
      else {
        if(isSaveAndClose()){
          navigate("/cidades")
        }else{
          navigate(`/cidades/detalhe/${result}`);
        }
     
      }
    });
  } else {
    CidadesServices.updateById(Number(id), { id: Number(id), ...dados }).then(
      (result) => {
        setIsloading(false);
        if (result instanceof Error) {
          alert(result.message);
        }else{
          if(isSaveAndClose()){
            navigate("/cidades")
          }
        }
      }
    );
  }
})
.catch((errors:yup.ValidationError)=>{

  const validationErros:IVFormsErros= {}
  errors.inner.forEach(error=>{
    if(!error.path)return;
    validationErros[error.path] = error.message
  })


formRef.current?.setErrors(validationErros)
})


  };

  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar este registro?")) {
      CidadesServices.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com suceeso");
          navigate("/cidades");
        }
      });
    }
  };
  return (
    <LayoutBaseDePagina titulo={id === "nova" ? "Nova cidade" : nome}>
      <FerramentasDeDetalhe
        textoBotaoNovo="Nova"
        mostrarBotaoSalvarEFechar
        mostrarBotaoApagar={id !== "nova"}
        mostrarBotaoNovo={id !== "nova"}
        aoClicarEmSalvar={save}
        aoClicarEmSalvarEFechar={saveAndClose}
        aoClicarEmApagar={() => {
          handleDelete(Number(id));
        }}
        aoClicarEmNovo={() => {
          navigate("/cidades/detalhe/nova");
        }}
        aoClicarEmVoltar={() => {
          navigate("/cidades");
        }}
      />

      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display={"flex"}
          flexDirection={"column"}
          component={Paper}
          variant="outlined"
        >
          <Grid container direction={"column"} padding={2} spacing={2}>

          {( isLoading &&
              <Grid item>
              <LinearProgress variant="indeterminate"/>
            </Grid>
          )}

             <Grid item>
              <Typography variant="h6">
                Geral
              </Typography>
             </Grid>

            <Grid container item direction={"row"}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField fullWidth label="Nome" name="nome" disabled={isLoading} variant={id !== 'nova'? "filled":undefined} onChange={e =>setNome(e.target.value)}/>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    
    </LayoutBaseDePagina>
  );
};
