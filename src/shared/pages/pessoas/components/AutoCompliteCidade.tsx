import { Autocomplete, CircularProgress, TextField } from "@mui/material"

import { useEffect, useMemo, useState } from "react"
import { CidadesServices } from "../../../services/api/cidades/CidadesServices"
import { useDebounce } from "../../../hooks"
import { useField } from "@unform/core"

type TAutoCompleteOption = {
    id:number,
    label:string
}


interface IAutoCompleteCidadeProps{
    isExternalLoading?:boolean
}
export const AutoComplteCidade = ({ isExternalLoading = false}:IAutoCompleteCidadeProps)=>{

const [option, setOption] =useState<TAutoCompleteOption[]>([])
const [isLoading, setIsLoading] =useState(false)
const [busca, setBusca] = useState("")
const [selectedId,setSelectedId] = useState<number | undefined>(undefined)
const {fieldName,registerField,defaultValue,error, clearError} = useField('cidadeId')
const {debounce} = useDebounce()

useEffect(()=>{
    registerField({
        name:fieldName,
        getValue:()=>selectedId,
        setValue:(_,newSelectedId)=>setSelectedId(newSelectedId)
    })
},[registerField,fieldName,selectedId])

useEffect(()=>{
    setIsLoading(true);

    debounce(() => {
      CidadesServices.getAll(1,busca).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
         alert(result.message);
        } else {

        
          setOption(result.data.map(cidade =>({id:cidade.id,label:cidade.nome})));
        }
      });
    });

},[busca, debounce])

const autocompleteSelectedOption = useMemo(()=>{
    if(!selectedId)return null
    const selectedOptin = option.find(item => item.id === selectedId)
    if(!selectedOptin)return null
    return selectedOptin
},[selectedId,option])

    return(
        <Autocomplete
        openText="Abrir"
        closeText="Fechar"
        noOptionsText="Sem opções"
        loadingText="Carregando..."
        disablePortal
        disabled={isExternalLoading}
        value={autocompleteSelectedOption}
        loading={isLoading}
        popupIcon={isExternalLoading || isLoading? <CircularProgress size={28}/>:undefined}
        onInputChange={(_,newValue)=>setBusca(newValue)}
        options={option}
        onChange={(_,newValue)=>{ setSelectedId(newValue?.id);setBusca(''); clearError()}}
        renderInput={(params)=>(
        
        <TextField
        {...params}
        label={"Cidade"}
        error={!!error}
        helperText={error}
       
        />)}
        
        />
    )
}