import axios, {AxiosResponse} from "axios";
import {ResponseType} from "./todolists-api";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e36cc859-2d32-4268-9e32-e789f71b72ba'
    }
})



export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{userId: number}>>>('auth/login', data)
    }
}

export type LoginParamsType = {
    email : string
    password: string
    rememberMe?: boolean
    captcha?: string
}