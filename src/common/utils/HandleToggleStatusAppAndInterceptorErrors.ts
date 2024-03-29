import {AppDispatchType} from "../../pages/app/store";
import {actionsApp, RequestStatusType} from "../../pages/app/app-reducer";
import {handlerNetworkError} from "./HandlerErrorsUtils";

//утилитка устанавливает AppStatus в значение 'loading' и обратно  при любом ответе
//если в параметрах передается статус, устанавливает указанный статус,
// если нет устанавливает "loading" по  умолчанию
export const HandleToggleStatusAppAndInterceptorErrors = (dispatch:AppDispatchType, promises:any[], status?:RequestStatusType) => {

        if (status) {
            dispatch(actionsApp.setAppStatus(status))
        } else {
            dispatch(actionsApp.setAppStatus('loading'))
        }

        Promise.all(promises).catch((e) => {
            if (status === "initialize") {
                return
            }
            handlerNetworkError(dispatch, e)
        })

        Promise.allSettled(promises).then((res) => {
                dispatch(actionsApp.setAppStatus('idle'))
        })





}
