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

export const registration = (data: RegisterPayloadType) => (dispatch: Dispatch<ActionAuthType>) => {
    dispatch(actionsApp.setAppStatus('loading'))
    API.register(data)
        .then(() => {
            dispatch(actionsAuth.setRegisteredUser(true))
        })
        .catch(err => {
            handlerNetworkError(dispatch, err)
        }).finally(()=>{
        dispatch(actionsApp.setAppStatus('idle'))
    })
}


export const thunkAuth = {
    login: (loginPayload: LoginPayloadType): AppThunk => async (dispatch: AppDispatchType) => {
        try {
            const response = await API.login(loginPayload)
            if (response.statusText === 'OK') {
                dispatch(actionsAuth.setLoginData({...response.data, isAuthorized: true, isRegistration: true}))
            }
        } catch (e) {
            handlerNetworkError(dispatch, e)
        }
    },

    authMe: ():AppThunk => async (dispatch: AppDispatchType) => {
        try {
            const response = await API.authMe();
            if (response.statusText === 'OK') {
                dispatch(actionsAuth.setLoginData({...response.data, isAuthorized: true,isRegistration: false}))
            return response
            }
        } catch (e) {
            handlerNetworkError(dispatch, e)
            return e
        }
    },

    logout: (): AppThunk => async (dispatch: AppDispatchType) => {
        try {
            const response = await API.logOut()
            console.log(response)
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
        } catch (e) {
            handlerNetworkError(dispatch, e)
        }

    },
    fetchRecoveryPassMail: (email: string) => async (dispatch: AppDispatchType) => {
        const message = "<div style=\"background-color: lime; padding: 15px\"> password recovery link: <a href='https://dreamlife37.github.io/React_Project_for_Friday/set-new-password/$token$'>Жмякни быстро на ссыль!</a></div>"
        try {
            await API.forgotPassword({email, message, from: ''})
        } catch (e) {
            handlerNetworkError(dispatch, e)
        }
    },
    setPassword: (payload: setNewPassWordPayloadType): AppThunk => async (dispatch: AppDispatchType) => {
        try {
            const res = await API.setNewPassWord(payload)
            if (res.statusText === 'OK') {
            }
            return res
        } catch (e) {
            handlerNetworkError(dispatch, e)
            return e
        }
    }
}

