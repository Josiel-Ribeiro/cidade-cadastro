
import { Environment } from "../../../environments";
import { Api } from "../axios-config";



/* eslint-disable @typescript-eslint/no-unused-expressions */

export interface IListagemCidades {
  id: number;
  nome: string;
 
}
export interface IDatelhePessoa {
  id: number;
  nome: string;
 
}

type TPessoaComTotalCount = {
  data: IListagemCidades[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<TPessoaComTotalCount | Error> => {
  try {
    const urlRelativa = `/cidades?_page=${page}&_limit=${Environment.LIMITITE_DE_LINHAS}&nome_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers["x-total-count"] || Environment.LIMITITE_DE_LINHAS
        ),
      };
    }
    return new Error("Erro ao listar os registros");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao listar os registros"
    );
  }
};

const getByld = async (id: number): Promise<IDatelhePessoa| Error> => {
  try {
    const { data } = await Api.get(`/cidades/${id}`);
    if (data) {
      return data 
      }
      return new Error("Erro na buscar")
    }catch(error){
        return new Error((error as {message:string}).message || "Erro na buscar")
    }
   
};


const create = async (dados:Omit<IDatelhePessoa,'id'>): Promise<number| Error> => {

try{
   

 const {data} = await Api.post<IDatelhePessoa>(`/cidades`,dados)
 if(data){
    return data.id
 }
 return  new Error("Erro ao adicionar")
}catch(error){
    return new Error((error as {message:string}).message || "Erro ao adicionar")

};
}

const updateById = async (id:number,dados:IDatelhePessoa): Promise<void | Error> => {

   try {
    await Api.put(`/cidades/${id}`,dados)

   } catch (error) {
    
    return new Error((error as {message:string}).message || "Erro ao atualizar o registro")
   }

};


const deleteById = async (id:number): Promise<void | Error> => {
    try {
       await Api.delete(`/cidades/${id}`)
    } catch (error) {
        return new Error("Erro ao deletar")
    }
};

export const CidadesServices = {
  getAll,
  getByld,
  create,
  updateById,
  deleteById,
}