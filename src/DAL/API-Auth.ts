import {AxiosResponse} from "axios";
import {instance} from "./Global";

export type RegisterPayloadType = {
    email: string
    password: string
}
export type LoginPayloadType = {
    email: string
    password: string
    rememberMe: boolean
}
type UpdatePayloadType = {
    name?: string,
    avatar?: string  // "https//avatar-url.img"  url or base64
}

type ForgotPasswordPayloadType = {
    email: string // "nya@nya.nya"             кому восстанавливать пароль
    from: string                    //"test-front-admin <ai73a@yandex.by>",// можно указать разработчика фронта)
    message: string
    //`<div style="background-color: lime; padding: 15px">
    //     password recovery link:
    //     <a href='http://localhost:3000/#/set-new-password/$token$'>link</a>
    // </div>`
    // хтмп-письмо, вместо $token$ бэк вставит токен
}

export type setNewPassWordPayloadType = {
    password: string            //"some-new-pass"
    resetPasswordToken: string  //"some-token-from-url"
}
type RegisterResponseDataType = {
    addedUser: {
        created: string
        email: string
        isAdmin: boolean
        name: string
        publicCardPacksCount: number
        rememberMe: boolean
        updated: string
        verified: boolean
        __v: number
        _id: string
    }
}
export type EntityUser = {
    _id: string
    __v: number
    email: string
    name: string
    avatar: string
    publicCardPacksCount: number// количество колод
    created: string
    updated: string
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean
    token: string
    tokenDeathTime: number
}

export type LogOutData = {
    info: string
    error?: string;
}
export type ForgotPasswordData = {
    info: string
    error?: string;
}
export type setNewPassWordDataType = {
    info: string      //"setNewPassword success —ฅ/ᐠ.̫ .ᐟ\ฅ—"
    error?: string;
}


export const APIAuth = {
    register: (registerPayload: RegisterPayloadType) => instance.post(`/auth/register`, {...registerPayload})
        .then((response: AxiosResponse<RegisterResponseDataType>) => {
            return response.data.addedUser
        }),

    login: (loginPayload: LoginPayloadType) => instance.post(`/auth/login`, {...loginPayload})
        .then((response: AxiosResponse<EntityUser>) => {
            return {
                data: {...response.data,isAuthorized:true},
                statusText: response.statusText
            }
        }),

    logOut: () => instance.delete(`/auth/me`, {})
        .then((response: AxiosResponse<LogOutData>) => {
            /*разлогинивание бэк меняет токен и очищает куки*/
            return {data: response.data, statusText: response.statusText}
        }),

    authMe: () => instance.post(`/auth/me`, {})
        .then((response: AxiosResponse<EntityUser>) => {
            return {data: {...response.data,isAuthorized:true}, statusText: response.statusText}
        }),

    updateNickOrAvatar: (updatePayload: UpdatePayloadType) => instance.put(`/auth/me`, {...updatePayload})
        .then((response: AxiosResponse<{updatedUser: EntityUser}>) => {
            /*изменение имени или аватарки*/
            return {...response.data.updatedUser,isAuthorized:true}
        }),

    forgotPassword: (forgotPassWordPayload: ForgotPasswordPayloadType) => instance.post(`/auth/forgot`, {...forgotPassWordPayload})
        .then((response: AxiosResponse<ForgotPasswordData>) => {
            /*пользователь вводит свой емайл на него прийдёт ссылка
             хтмл можно любой в ссылке укажите адрес страницы своего фрона
             на локальном бэке не работает слать запрос на хероку*/
            return response
        }),

    setNewPassWord: (setNewPassWordPayload: setNewPassWordPayloadType) => instance.post(`/auth/set-new-password`, {...setNewPassWordPayload})
        .then((response: AxiosResponse<setNewPassWordDataType>) => {
            /*пользователь отправляет новый пароль, заберите токен из url если всё ок - редирект на логин*/
            return response
        })
}