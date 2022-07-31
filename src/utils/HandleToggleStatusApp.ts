import {AppDispatchType} from "../pages/app/store";
import {actionsApp, RequestStatusType} from "../pages/app/app-reducer";
import {AxiosError, AxiosResponse} from "axios";
import {handlerNetworkError} from "./HandlerErrorsUtils";

//утилитка устанавливает AppStatus в значение 'loading' и обратно  при любом ответе
//если в параметрах передается статус, устанавливает указанный статус,
// если нет устанавливает "loading" по  умолчанию
export const HandleToggleStatusApp = (dispatch:AppDispatchType, response:any[],status?:RequestStatusType) => {

    if(status){
        dispatch(actionsApp.setAppStatus(status))
    }else {
        dispatch(actionsApp.setAppStatus('loading'))
    }

    Promise.all(response).catch((e)=>{
        if (status==="initialize"){return}
        handlerNetworkError(dispatch,e)
    })

    Promise.allSettled(response).then((res) => {


        dispatch(actionsApp.setAppStatus('idle'))
    })

}
