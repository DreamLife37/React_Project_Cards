import {API, LoginPayloadType} from "../../DAL/API";
import {handlerNetworkError} from "../../utils/HandlerErrorsUtils";
import {AppDispatchType, AppThunk, InferActionsType} from "../app/store";

type initialStateType = {
    _id: string,
    email: string,
    name: string,
    avatar: string|undefined,
    publicCardPacksCount: number | null,
    isAdmin: boolean,
    token: string | null,
    isAuthorized: boolean
}
type ActionAuthType = InferActionsType<typeof actionsAuth>

const initialState = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount:  null,
    isAdmin: false,
    token: '',
    isAuthorized: false
}


export const authReducer = (state: initialStateType = initialState, action: ActionAuthType): initialStateType => {
    switch (action.type) {
        case 'SET-LOGIN-DATA':
            return {...state, ...action.payload}
        // case 'SET-NEW-PASSWORD':
        //     return {...state}
        // case 'RECOVERY-PASSWORD':
        //     return {...state}
        // case 'SET-REGISTERED-USER':
        //     return {...state}
        default: {
            return {...state};
        }
    }
}


export const actionsAuth = {
    setLoginData: (payload: initialStateType) => ({type: 'SET-LOGIN-DATA', payload} as const)
}

export const thunkAuth = {
    login: (loginPayload: LoginPayloadType): AppThunk => async (dispatch: AppDispatchType) => {
        try {
            const response = await API.login(loginPayload)
            console.log(response)
            if (response.statusText === 'OK') {
                dispatch(actionsAuth.setLoginData({...response.data, isAuthorized: true}))
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
                            isAuthorized: false
                        }
                    )
                )
            }
        } catch (e) {
            handlerNetworkError(dispatch, e)
        }

    }
}
