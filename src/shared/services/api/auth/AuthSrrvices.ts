import { Api } from "../axios-config"


interface IAuth{
    accessToken:string
}

const auth = async(email:string,password:string): Promise<IAuth| Error> => {

    try{
     
    
     const {data} = await Api.get(`/auth`,{data:{email,password}})
        return data? data : new Error("Erro no Login")
     
   
    }catch(error){
        return new Error((error as {message:string}).message || "Erro no login")
    
    };
    }

export const AuthServices = {
auth

}