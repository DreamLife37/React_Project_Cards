import {Dispatch} from "redux";
import {
    API,
    LoginPayloadType,
    RegisterPayloadType,
    setNewPassWordPayloadType
} from "../../DAL/API";
import {handlerNetworkError} from "../../utils/HandlerErrorsUtils";
import {actionsApp} from "../app/app-reducer";
import {AppDispatchType, AppThunk, InferActionsType} from "../app/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HandleToggleStatusApp} from "../../utils/HandleToggleStatusApp";

type initialStateType = {
    _id: string,
    email: string,
    name: string,
    avatar: string,
    publicCardPacksCount: number | null,
    isAdmin: boolean,
    token: string | null,
    isAuthorized: boolean
    isRegistration: boolean
}

type ActionAuthType = InferActionsType<typeof actionsAuth | typeof actionsApp>

const initialState = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: null,
    isAdmin: false,
    token: '',
    isAuthorized: false,
    isRegistration: false
}

const authSlice = createSlice({
    name: 'AUTH',
    initialState: initialState,
    reducers: {
        setLoginData: (state, action: PayloadAction<initialStateType>) => {
            Object.assign(state, action.payload);
        },
        setRegisteredUser: (state, action: PayloadAction<boolean>) => {
            state.isRegistration = action.payload
        },
    }
})

export const authReducer = authSlice.reducer

export const actionsAuth = authSlice.actions

export const registration = (data: RegisterPayloadType): AppThunk => async (dispatch: Dispatch<ActionAuthType>) => {

    dispatch(actionsApp.setAppStatus('loading'))

    const response = await API.register(data)
        .then(() => {
            dispatch(actionsAuth.setRegisteredUser(true))
        })
        .catch(err => {
            handlerNetworkError(dispatch, err)
        })
    //утилитка сброса статуса Апп в значение 'idle'
    //если вызвать в try то сработает только при успешном запросе
    HandleToggleStatusApp(dispatch, response)

}


export const thunkAuth = {

    setNameOrAvatar:(payload:{name?: string,avatar?:string}):AppThunk=>async (dispatch:AppDispatchType)=>{
        dispatch(actionsApp.setAppStatus('loading'))
        const response= await API.updateNickOrAvatar(payload)
            .then((res)=>{
                dispatch(actionsAuth.setLoginData({...res.data.updatedUser, isAuthorized: true, isRegistration: true}))
            }).catch((e)=>{
                handlerNetworkError(dispatch, e)
            })
        //утилитка сброса статуса Апп в значение 'idle'
        //если вызвать в try то сработает только при успешном запросе
        HandleToggleStatusApp(dispatch, response)
    },

    login: (loginPayload: LoginPayloadType): AppThunk => async (dispatch: AppDispatchType) => {

        dispatch(actionsApp.setAppStatus('loading'))

        const response = await API.login(loginPayload)
            .then((response) => {
                if (response.statusText === 'OK') {

                    dispatch(actionsAuth.setLoginData({...response.data, isAuthorized: true, isRegistration: true}))

                }
            })
            .catch((e) => {
                handlerNetworkError(dispatch, e)
            })

        //утилитка сброса статуса Апп в значение 'idle'
        //если вызвать в try то сработает только при успешном запросе
        HandleToggleStatusApp(dispatch, response)
    },

    authMe: (): AppThunk => async (dispatch: AppDispatchType) => {
        try {
            const response = await API.authMe();
            if (response.statusText === 'OK') {
                dispatch(actionsAuth.setLoginData({...response.data, isAuthorized: true, isRegistration: false}))
                return response
            }
        } catch (e) {
            handlerNetworkError(dispatch, e)
            return e
        }
    },

    logout: (): AppThunk => async (dispatch: AppDispatchType) => {

        dispatch(actionsApp.setAppStatus('loading'))

        const response = await API.logOut()
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
                                isRegistration: false
                            }
                        )
                    )
                }
            })
            .catch((e) => {
                handlerNetworkError(dispatch, e)
            })
        //утилитка сброса статуса Апп в значение 'idle'
        //если вызвать в try то сработает только при успешном запросе
        HandleToggleStatusApp(dispatch, response)

    },
    fetchRecoveryPassMail: (email: string): AppThunk => async (dispatch: AppDispatchType) => {
        //санка отправляет запрос на восстановление пароля и ретернит любой ответ
        // если статус текст ОК то страница восстановления пароля редиректит на  страницу информирования
        // проверки почты, если  статус текст undefined то редиректит обратно на логин
        const message = "<div style=\"background-color: lime; padding: 15px\"> password recovery link: <a href='https://dreamlife37.github.io/React_Project_Cards/#/set-new-password/$token$'>Жмякни быстро на ссыль!</a></div>"

        dispatch(actionsApp.setAppStatus('loading'))

        const response = await API.forgotPassword({email, message, from: ''})
            .catch((e) => {
                handlerNetworkError(dispatch, e)
            })

        HandleToggleStatusApp(dispatch, response)
        return response

    },
    setPassword: (payload: setNewPassWordPayloadType): AppThunk => async (dispatch: AppDispatchType) => {
        //санка отправляет запрос с новым паролем и токеном из URL и  ретернит response,
        // если в респонсе статус текст ОК то страница изменения пароля
        // редиректит на страницу логина, если статус текст undefined  то редиректит
        // обратно на страницу запроса почты для отправки письма воссттановленя пароля
        dispatch(actionsApp.setAppStatus('loading'))

        const response = await API.setNewPassWord(payload)
            .catch((e) => {
                handlerNetworkError(dispatch, e)
            })

        HandleToggleStatusApp(dispatch, response)

        return response
    }
}

