/* eslint-disable react-hooks/exhaustive-deps */
import { TextField,TextFieldProps } from "@mui/material"
import { useField } from "@unform/core"
import { useEffect, useState } from "react"


type TVTextFieldProps = TextFieldProps & {
    name:string
}

export const VTextField = ({name, ...rest}:TVTextFieldProps)=>{

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {fieldName,registerField,defaultValue,error,clearError} = useField(name)

const [value,setValue] = useState(defaultValue || "" )



useEffect(()=>{
    registerField({
       name:fieldName,
       getValue:()=>value,
       setValue:(_,newValue)=>setValue(newValue)

    })
},[registerField,fieldName,value])

    return(
        <TextField
        {...rest}


        error={!!error}
        value={value}
        helperText={error}
        defaultValue={defaultValue}
        onKeyDown={(e)=>{error && clearError();rest.onKeyDown?.(e)}}
        onChange={e=>{setValue(e.target.value);rest.onChange?.(e)}}
        />
    )
}