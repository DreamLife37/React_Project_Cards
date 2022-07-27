import {AppDispatchType} from "../pages/app/store";
import {actionsApp} from "../pages/app/app-reducer";
import {AxiosResponse} from "axios";

//утилитка устанавливает AppStatus в значение 'idle' при любом ответе
export const HandleToggleStatusApp = (dispatch:AppDispatchType, response:void | AxiosResponse) => {

    Promise.allSettled([response]).then(() => {
        dispatch(actionsApp.setAppStatus('idle'))
    })
}