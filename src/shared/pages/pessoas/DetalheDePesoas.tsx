/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../layouts";
import { FerramentasDeDetalhe } from "../../components";
import { useEffect, useState } from "react";
import { PessoaServices } from "../../services/api/pessoas/PessoasServices";
import { VTextField,VForm,useVForm, IVFormsErros } from "../../forms";
import * as yup from 'yup'

import { Box, Grid, LinearProgress, Paper, TextField, Typography } from "@mui/material";
import { Form } from "react-hook-form";
import { AutoComplteCidade } from "./components/AutoCompliteCidade";


interface IFormData {
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}



const formValidationSchema:yup.Schema<IFormData>= yup.object().shape({
  nomeCompleto:yup.string().required().min(3),
  email:yup.string().required().email(),
  cidadeId:yup.number().required()
  })

export const DetalheDePesoas = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const {formRef,save,saveAndClose,isSaveAndClose} = useVForm()

  const [isLoading, setIsloading] = useState(false);
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (id !== "nova") {
      setIsloading(true);
      PessoaServices.getByld(Number(id)).then((result) => {
        setIsloading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate("/pessoas");
        } else {
          setNome(result.nomeCompleto);
          formRef.current?.setData(result);
        }
      });
    }else{
      formRef.current?.setData({
        nomeCompleto:"",
        cidadeId:undefined,
        email:""
      })
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {


formValidationSchema.
validate(dados,{abortEarly:false})
.then((dadosValidados)=>{
  setIsloading(true);
    
  if (id === "nova") {
    PessoaServices.create(dadosValidados).then((result) => {
      setIsloading(false);
      if (result instanceof Error) {
        alert(result.message);
      } 
      
      else {
        if(isSaveAndClose()){
          navigate("/pessoas")
        }else{
          navigate(`/pessoas/detalhe/${result}`);
        }
     
      }
    });
  } else {
    PessoaServices.updateById(Number(id), { id: Number(id), ...dados }).then(
      (result) => {
        setIsloading(false);
        if (result instanceof Error) {
          alert(result.message);
        }else{
          if(isSaveAndClose()){
            navigate("/pessoas")
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
      PessoaServices.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com suceeso");
          navigate("/pessoas");
        }
      });
    }
  };
  return (
    <LayoutBaseDePagina titulo={id === "nova" ? "Nova pessoa" : nome}>
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
          navigate("/pessoas/detalhe/nova");
        }}
        aoClicarEmVoltar={() => {
          navigate("/pessoas");
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
                <VTextField fullWidth label="Nome Completo" name="nomeCompleto" disabled={isLoading} variant={id !== 'nova'? "filled":undefined} onChange={e =>setNome(e.target.value)}/>
              </Grid>
            </Grid>

            <Grid container item direction={"row"}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField fullWidth label="E-mail" name="email" disabled={isLoading} variant={id !== 'nova'? "filled":undefined}/>
              </Grid>
            </Grid>

            <Grid container item direction={"row"}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <AutoComplteCidade isExternalLoading={isLoading}/>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>



    
    
    </LayoutBaseDePagina>
  );
};
