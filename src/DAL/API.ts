import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

type RegisterDataType = {
    email: string
    password: string
}

export const API = {
    authRegister: (registerData:RegisterDataType) => instance.post(`/auth/register`, {
        email: registerData.email,
        password: registerData.password
    }).then((response:AxiosResponse)=>{
        return response
    })
}