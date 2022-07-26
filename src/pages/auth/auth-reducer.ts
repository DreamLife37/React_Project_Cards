import {Dispatch} from "redux";
import {API, LoginPayloadType, RegisterPayloadType} from "../../DAL/API";
import {handlerNetworkError} from "../../utils/HandlerErrorsUtils";
import {actionsApp} from "../app/app-reducer";
import {AppDispatchType, AppThunk, InferActionsType} from "../app/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type initialStateType = {
    _id: string,
    email: string,
    name: string,
    avatar: string | undefined,
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
            const obj = Object.assign(state, action.payload);
        },
        setRegisteredUser: (state, action: PayloadAction<boolean>) => {
            state.isRegistration = action.payload
        },
    }
})

export const authReducer = authSlice.reducer


// export const authReducer = (state: initialStateType = initialState, action: ActionAuthType): initialStateType => {
//     switch (action.type) {
//         case 'SET-LOGIN-DATA':
//             return {...state, ...action.payload}
//         // case 'SET-NEW-PASSWORD':
//         //     return {...state}
//         // case 'RECOVERY-PASSWORD':
//         //     return {...state}
//         case 'SET-REGISTERED-USER':
//             return {...state, isRegistration: action.value}
//         default: {
//             return {...state};
//         }
//     }
// }

export const actionsAuth = authSlice.actions

export const registration = (data: RegisterPayloadType) => (dispatch: Dispatch<ActionAuthType>) => {
    dispatch(actionsApp.setAppStatus('loading'))
    API.register(data)
        .then((res) => {
            dispatch(actionsAuth.setRegisteredUser(true))
        })
        .catch(err => {
            handlerNetworkError(dispatch, err)
        })
}


// export const actionsAuth = {
//     setLoginData: (payload: initialStateType) => ({type: 'SET-LOGIN-DATA', payload} as const),
//     setRegisteredUser: (value: boolean) => {
//         return {type: 'SET-REGISTERED-USER', value} as const
//     }
// }

export const thunkAuth = {
    login: (loginPayload: LoginPayloadType): AppThunk => async (dispatch: AppDispatchType) => {
        try {
            const response = await API.login(loginPayload)
            if (response.statusText === 'OK') {
                dispatch(actionsAuth.setLoginData({...response.data, isAuthorized: true,isRegistration: false}))
            }
        } catch (e) {
            handlerNetworkError(dispatch, e)
        }
    },
    authMe: () => async (dispatch: AppDispatchType) => {
        try {
            const response = await API.authMe();
            if (response.statusText === 'OK') {
                dispatch(actionsAuth.setLoginData({...response.data, isAuthorized: true, isRegistration: false}))
            }
        } catch (e) {
            handlerNetworkError(dispatch, e)
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

    }
}

