import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../pages/app/store";
import {TransitionAlerts} from "./TransitionErrorAlert";
import {actionsErrors} from "./ErrorsReducer";


export const AlertErrorWrap = () => {

    const errors =useSelector((state:AppStoreType)=>state.error.errors)
    const dispatch=useDispatch()

    const clearErrors = () => {
      dispatch(actionsErrors.clearErrors())
    }

    const mappedErrorAlerts=errors.map((err,index)=>
        <div key={err+index}><TransitionAlerts  clearErrorCallback={clearErrors} error={err}/></div>
    )

    return(
        <>
            {mappedErrorAlerts}
        </>
    )
}