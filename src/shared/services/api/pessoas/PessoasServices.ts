import { error } from "console";
import { Environment } from "../../../environments";
import { Api } from "../axios-config";
import { DetailedHTMLFactory } from "react";
import { stat } from "fs";

/* eslint-disable @typescript-eslint/no-unused-expressions */

export interface IListagemPessoas {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}
export interface IDatelhePessoa {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}

type TPessoaComTotalCount = {
  data: IListagemPessoas[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<TPessoaComTotalCount | Error> => {
  try {
    const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
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
    const { data } = await Api.get(`/pessoas/${id}`);
    if (data) {
      return data 
      }
      return new Error("Erro na buscar")
    }catch(error){
        return new Error((error as {message:string}).message || "Erro na buscar")
    }
   
};


const create = async (nomeCompleto:string,email:string,cidadeId:number): Promise<number| Error> => {

try{
    let dados = {
        nomeCompleto,email,cidadeId
    }

 const {data} = await Api.post<IDatelhePessoa>(`/pessoas`,dados)
 if(data){
    return data.id
 }
 return new Error("Erro ao adicionar")
}catch(error){
    return new Error((error as {message:string}).message || "Erro ao adicionar")

};
}

const updateById = async (id:number,nomeCompleto:string,email:string,cidadeId:number): Promise<void | Error> => {

   try {
    await Api.put(`/pessoas/${id}`,{nomeCompleto,email,cidadeId})
   } catch (error) {
    return new Error("Erro ao atualizar o registro")
   }

};


const deleteById = async (id:number): Promise<void | Error> => {
    try {
       await Api.delete(`/pessoas/${id}`)
    } catch (error) {
        return new Error("Erro ao deletar")
    }
};

export const PessoaServices = {
  getAll,
  getByld,
  create,
  updateById,
  deleteById,
}