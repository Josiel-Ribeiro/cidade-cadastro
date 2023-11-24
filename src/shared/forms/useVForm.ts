import { FormHandles } from "@unform/core";
import { useCallback, useRef } from "react";

 export const useVForm = ()=>{
    const formRef = useRef<FormHandles>(null);
    
    const isSavingAndNew = useRef(false)
    const isSavingAndClode = useRef(false)

    const handleSave = useCallback(()=>{
        isSavingAndNew.current = false
        isSavingAndClode.current =false
        formRef.current?.submitForm();
    },[])
    const handleSaveAndNew = useCallback(()=>{
        isSavingAndNew.current = true
        isSavingAndClode.current = true
        formRef.current?.submitForm();
    },[])
    const handleSaveAndClose = useCallback(()=>{
        isSavingAndNew.current = false
        isSavingAndClode.current = true
        formRef.current?.submitForm();
    },[])
    const handleIsSaveAndNew = useCallback(()=>{ 
        return isSavingAndNew.current;
    },[])
    const handleSaveIsClose = useCallback(()=>{
       return isSavingAndClode.current;
    },[])
    return {
        formRef,
        save:handleSave,
        saveAndNew:handleSaveAndNew,
        saveAndClose:handleSaveAndClose,
        isSaveAndNew:handleIsSaveAndNew,
        isSaveAndClose:handleSaveIsClose
    }
}