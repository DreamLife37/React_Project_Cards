
import {
    APIAuth, EntityUser,
    LoginPayloadType,
    RegisterPayloadType,
    setNewPassWordPayloadType
} from "../../DAL/API-Auth";

import {actionsApp} from "../app/app-reducer";
import {AppDispatchType, AppThunk} from "../app/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HandleToggleStatusAppAndInterceptorErrors} from "../../utils/HandleToggleStatusAppAndInterceptorErrors";

type InitialStateType = {
    authData: EntityUser & { isAuthorized: boolean }| Record<string, never>
}

const initialState: InitialStateType = {
    authData: {},
}


const authSlice = createSlice({
    name: 'AUTH',
    initialState,
    reducers: {
        setLoginData: (state, action: PayloadAction<InitialStateType["authData"]|{}>) => {
            if(Object.keys(action.payload).length===0) {
                state.authData = action.payload
            }else {
                state.authData = {...action.payload, ...action.payload}
            }

        }
    }
})

export const authReducer = authSlice.reducer
export const actionsAuth = authSlice.actions


export const thunkAuth = {

    authMe: (): AppThunk => (dispatch) => {

        const response = APIAuth.authMe().then((response) => {
                if (response.statusText === 'OK') {
                    dispatch(actionsAuth.setLoginData(response.data))
                    dispatch(actionsApp.setIsAuthTime("idle"))
                }
            }
        )
        HandleToggleStatusAppAndInterceptorErrors(dispatch, [response], "initialize")
    },

    registration: (data: RegisterPayloadType): AppThunk => (dispatch) => {

        const response = APIAuth.register(data)
            .then(() => {
                //ответ ожидается на странице регистрации для дальнейшего перехода на страницу логинизации
                return true
            })
        //утилитка переключения  статуса Апп
        //если вызвать в try то сработает только при успешном запросе
        HandleToggleStatusAppAndInterceptorErrors(dispatch, [response])

        return response
    },
    setNameOrAvatar: (payload: { name?: string, avatar?: string }): AppThunk => (dispatch) => {
        dispatch(actionsApp.setAppStatus('loading'))
        const response = APIAuth.updateNickOrAvatar(payload)
            .then((response) => {
                dispatch(actionsAuth.setLoginData(response))
            })
        //утилитка переключения  статуса Апп
        //если вызвать в try то сработает только при успешном запросе
        HandleToggleStatusAppAndInterceptorErrors(dispatch, [response])
    },

    login: (loginPayload: LoginPayloadType): AppThunk => (dispatch) => {

        const response = APIAuth.login(loginPayload)
            .then((response) => {
                if (response.statusText === 'OK') {
                    dispatch(actionsAuth.setLoginData(response.data))
                }
            })
        HandleToggleStatusAppAndInterceptorErrors(dispatch, [response])
    },

    logout: (): AppThunk => (dispatch: AppDispatchType) => {

        const response = APIAuth.logOut()
            .then((response) => {
                if (response.statusText === 'OK') {
                    dispatch(actionsAuth.setLoginData({}))
                    dispatch(actionsApp.setIsAuthTime("idle"))
                }
            })
        HandleToggleStatusAppAndInterceptorErrors(dispatch, [response])
    },
    fetchRecoveryPassMail: (email: string): AppThunk => (dispatch: AppDispatchType) => {
        //санка отправляет запрос на восстановление пароля и ретернит любой ответ
        // если статус текст ОК то страница восстановления пароля редиректит на  страницу информирования
        // проверки почты, если  статус текст undefined то редиректит обратно на логин
        const message = "<div style=\"background-color: lime; padding: 15px\"> password recovery link: <a href='https://dreamlife37.github.io/React_Project_Cards/#/set-new-password/$token$'>Жмякни быстро на ссыль!</a></div>"
        const response = APIAuth.forgotPassword({email, message, from: ''})
        HandleToggleStatusAppAndInterceptorErrors(dispatch, [response])
        return response

    },
    setPassword: (payload: setNewPassWordPayloadType): AppThunk => (dispatch: AppDispatchType) => {
        //санка отправляет запрос с новым паролем и токеном из URL и  ретернит response,
        // если в респонсе статус текст ОК то страница изменения пароля
        // редиректит на страницу логина, если статус текст undefined  то редиректит
        // обратно на страницу запроса почты для отправки письма воссттановленя пароля
        const response = APIAuth.setNewPassWord(payload)
        HandleToggleStatusAppAndInterceptorErrors(dispatch, [response])
        return response
    }
}

