import {AppDispatchType} from "../pages/app/store";
import {actionsApp, RequestStatusType} from "../pages/app/app-reducer";
import {AxiosResponse} from "axios";

//утилитка устанавливает AppStatus в значение 'loading' и обратно  при любом ответе
//если в параметрах передается статус, устанавливает указанный статус,
// если нет устанавливает "loading" по  умолчанию
export const HandleToggleStatusApp = (dispatch:AppDispatchType, response:Promise<void|AxiosResponse>,status?:RequestStatusType) => {

    if(status){
        dispatch(actionsApp.setAppStatus(status))
    }else {
        dispatch(actionsApp.setAppStatus('loading'))
    }

    Promise.allSettled([response]).then(() => {
        dispatch(actionsApp.setAppStatus('idle'))
    })
}
