import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "./store";
import {thunkAuth} from "../auth/auth-reducer";
import {HandleToggleStatusApp} from "../../utils/HandleToggleStatusApp";

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
    initializeApp:():AppThunk=>  (dispatch)=>{
        //санка включает статус, диспатчит санку authMe и ждет от нее любого ответа чтобы переключить статус
        const response= dispatch(thunkAuth.authMe())
        HandleToggleStatusApp(dispatch, [response],"initialize")

    }
}