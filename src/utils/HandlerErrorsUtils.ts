// import {appSlice} from "../Redux/AppReducer";
// import {AppDispatchType} from "../Redux/ReduxStore";
import {AxiosError} from "axios";
import {actions} from "../Errors/ErrorsReducer";
import {Dispatch} from "redux";

type ErrorResponse={
    emailRegExp: any
    error: string
    in: string
    isEmailValid: boolean
    isPassValid: boolean
    passwordRegExp: string
}
//эта штука перехватывает ошибки которые приходят с бека с херовыми статус кодами и отправляет их редюсер
export const handlerNetworkError = (dispatch: Dispatch, error: unknown) => {
    if (error instanceof AxiosError<ErrorResponse>) {
        console.log(error.response?.data)
        dispatch(actions.changeError(error.response?.data.error))
    } else {
        throw error
    }
}