import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { AuthServices } from "../services/api/auth/AuthSrrvices"


interface IAuthContextData {
    isAutenticated:boolean
    logout:()=>void
    login:(email:string, password:string)=>Promise<string | void>
}

const AuthContext = createContext({} as IAuthContextData)

const LOCAL_STORANGE_KEY__TOKEN = "TOKEN_APP_ACCESS"

export const AuthProvider = ({children}:{children:ReactNode})=>{

    const [accessToken,setAcessToken] = useState<string>()

    useEffect(()=>{
    const accessToken = localStorage.getItem(LOCAL_STORANGE_KEY__TOKEN)
    
    if(accessToken){
        setAcessToken(JSON.parse(accessToken))
    }else{
        setAcessToken(undefined)
    }
    },[])


    const login = useCallback( async(email:string,password:string)=>{

        const result = await AuthServices.auth(email,password)
        if(result instanceof Error){
            return result.message
        }else{
         localStorage.setItem(LOCAL_STORANGE_KEY__TOKEN,JSON.stringify(result.accessToken)) 
          setAcessToken(result.accessToken)
        }
   
    },[])

    const handleLogout = useCallback( ()=>{
        localStorage.removeItem(LOCAL_STORANGE_KEY__TOKEN)
   setAcessToken(undefined)
    },[])

    const isAutenticated = useMemo(()=>accessToken !== undefined,[accessToken])
    return(
        <AuthContext.Provider value={{isAutenticated,login,logout: handleLogout}}>
                   {children}
        </AuthContext.Provider>
    )
    }

    export const useAuthContext = ()=>useContext(AuthContext)