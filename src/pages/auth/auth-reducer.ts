import {Dispatch} from "redux";
import {
    APIAuth,
    LoginPayloadType,
    RegisterPayloadType,
    setNewPassWordPayloadType
} from "../../DAL/API-Auth";
import {handlerNetworkError} from "../../utils/HandlerErrorsUtils";
import {actionsApp} from "../app/app-reducer";
import {AppDispatchType, AppThunk, InferActionsType} from "../app/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HandleToggleStatusAppAndInterceptorErrors} from "../../utils/HandleToggleStatusAppAndInterceptorErrors";

type initialStateType = {
    _id: string,
    email: string,
    name: string,
    avatar: string,
    publicCardPacksCount: number | null,
    isAdmin: boolean,
    token: string | null,
    isAuthorized: boolean
}

const initialState = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: null,
    isAdmin: false,
    token: '',
    isAuthorized: false,
}


const authSlice = createSlice({
    name: 'AUTH',
    initialState,
    reducers: {
        setLoginData: (state, action: PayloadAction<initialStateType>) => {
            Object.assign(state, action.payload);
        }
    }
})

export const authReducer = authSlice.reducer
export const actionsAuth = authSlice.actions


export const thunkAuth = {

    authMe: (): AppThunk => (dispatch) => {

        const response = APIAuth.authMe().then((response) => {
                if (response.statusText === 'OK') {
                    dispatch(actionsAuth.setLoginData({...response.data, isAuthorized: true}))
                }
            }
        )
        HandleToggleStatusAppAndInterceptorErrors(dispatch, [response], "initialize")
    },

    registration: (data: RegisterPayloadType): AppThunk => (dispatch) => {

        const response = APIAuth.register(data)
            .then(() => {
               return true
            })
        //утилитка переключения  статуса Апп
        //если вызвать в try то сработает только при успешном запросе
        HandleToggleStatusAppAndInterceptorErrors(dispatch, [response])
        //ответ ожидается на странице регистрации для дальнейшего перехода на страницу логинизации
        return response
    },
    setNameOrAvatar: (payload: { name?: string, avatar?: string }): AppThunk => (dispatch) => {
        dispatch(actionsApp.setAppStatus('loading'))
        const response = APIAuth.updateNickOrAvatar(payload)
            .then((res) => {
                dispatch(actionsAuth.setLoginData({...res.data.updatedUser, isAuthorized: true}))
            })
        //утилитка переключения  статуса Апп
        //если вызвать в try то сработает только при успешном запросе
        HandleToggleStatusAppAndInterceptorErrors(dispatch, [response])
    },

    login: (loginPayload: LoginPayloadType): AppThunk => (dispatch) => {


        const response = APIAuth.login(loginPayload)
            .then((response) => {
                if (response.statusText === 'OK') {
                    dispatch(actionsAuth.setLoginData({...response.data}))
                }
            })
        HandleToggleStatusAppAndInterceptorErrors(dispatch, [response])
    },

    logout: (): AppThunk => (dispatch: AppDispatchType) => {

        const response = APIAuth.logOut()
            .then((response) => {
                if (response.statusText === 'OK') {
                    dispatch(actionsAuth.setLoginData(
                            {
                                _id: '',
                                email: '',
                                name: '',
                                avatar: '',
                                publicCardPacksCount: null,
                                isAdmin: false,
                                token: '',
                                isAuthorized: false,
                            }
                        )
                    )
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

