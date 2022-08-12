import {AxiosError} from "axios";
import {actionsErrors} from "../error/ErrorsReducer";
import {AppDispatchType} from "../pages/app/store";

type ErrorResponse={
    emailRegExp: any
    error: string
    in: string
    isEmailValid: boolean
    isPassValid: boolean
    passwordRegExp: string
}
//эта штука перехватывает ошибки которые приходят с бека с херовыми статус кодами и отправляет их редюсер
export const handlerNetworkError = (dispatch: AppDispatchType, error: unknown) => {
    if (error instanceof AxiosError<ErrorResponse>) {
        dispatch(actionsErrors.changeError(error.response?.data.error))
    } else {
        throw error
    }
}