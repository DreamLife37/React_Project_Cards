// import {appSlice} from "../Redux/AppReducer";
// import {AppDispatchType} from "../Redux/ReduxStore";
import {AxiosError} from "axios";
import {actions} from "../Errors/ErrorsReducer";
import {Dispatch} from "redux";

//эта штука перехватывает ошибки которые приходят с бека с херовыми статус кодами и отправляет их редюсер
export const handlerNetworkError = (dispatch: Dispatch, error: unknown) => {
    if (error instanceof AxiosError) {
        dispatch(actions.changeError(error.response?.data.error))
    } else {
        throw error
    }
}