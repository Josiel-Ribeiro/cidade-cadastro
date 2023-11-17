import axios from "axios";
import { errorIterceptor, responseinterceptor } from "./interceptos";
import { Environment } from "../../../environments";

const Api =  axios.create({
    baseURL:Environment.URL_BASE
})

Api.interceptors.response.use(
    (response)=>responseinterceptor(response),
    (error)=>errorIterceptor(error)
)

export {Api}