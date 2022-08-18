import {AxiosError} from "axios";
import {actionsErrors} from "../../error/ErrorsReducer";
import {AppDispatchType} from "../../pages/app/store";
import {actionsAuth, thunkAuth} from "../../pages/auth/auth-reducer";

type ErrorResponse={
    emailRegExp: any
    error: string
    in: string
    isEmailValid: boolean
    isPassValid: boolean
    passwordRegExp: string
}
//эта штука перехватывает ошибки которые приходят с бека с херовыми статус кодами и отправляет их в редюсер
export const handlerNetworkError = (dispatch: AppDispatchType, error: unknown) => {
    if (error instanceof AxiosError<ErrorResponse>) {
        //если бек вылогинил юзера, зачищает данные юзера,
        // на измененение приложение отреагирует редиректом на логин
        if(error.response?.status===401){
        dispatch(actionsAuth.setLoginData({}))
        }
        dispatch(actionsErrors.changeError(error.response?.data.error))
    } else {
        throw error
    }
}