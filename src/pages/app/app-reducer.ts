import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "./store";
import {thunkAuth} from "../auth/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'|'initialize'

const initialState: InitialStateType = {
    status: 'initialize'
}
type InitialStateType = {
    status: RequestStatusType
}

 const appSlice=createSlice({
    name:'app',
    initialState,
    reducers:{
        setAppStatus:(state:Draft<InitialStateType>, action:PayloadAction<RequestStatusType>)=>{
            state.status=action.payload
        }
    }

})

export const appReducer =appSlice.reducer
export const actionsApp = appSlice.actions


export const thunkApp={
    initializeApp:():AppThunk=>async (dispatch)=>{
        //санка включает статус, диспатчит санку authMe и ждет от нее любого ответа чтобы переключить статус
        dispatch(actionsApp.setAppStatus('initialize'))
        const response= await dispatch(thunkAuth.authMe())
        Promise.allSettled([response]).then(()=>{
            dispatch(actionsApp.setAppStatus('idle'))
        })




    }
}