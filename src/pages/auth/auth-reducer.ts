import {Dispatch} from "redux";
import {API, RegisterPayloadType} from "../../DAL/API";
import {handlerNetworkError} from "../../utils/HandlerErrorsUtils";
import {setAppStatus, setAppStatusActionType} from "../app/app-reducer";

const initialState = {
    isRegistration: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'SET-LOGIN-DATA':
            return {...state}
        case 'SET-NEW-PASSWORD':
            return {...state}
        case 'RECOVERY-PASSWORD':
            return {...state}
        case 'SET-REGISTERED-USER':
            return {...state, isRegistration: action.value}
        default: {
            return {...state};
        }
    }
}

export const setRegisteredUser = (value: boolean) => {
    return {type: 'SET-REGISTERED-USER', value}
}

export const registration = (data: RegisterPayloadType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('loading'))
    API.register(data)
        .then((res) => {
            dispatch(setRegisteredUser(true))
        })
        .catch(err => {
            handlerNetworkError(dispatch, err)
        })
}

type ActionsType = ReturnType<typeof setRegisteredUser> | setAppStatusActionType