import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "./store";
import {thunkAuth} from "../auth/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'|'initialize'
export type AuthTimeStatusType= "idle"|"timeToUpdateToken"|"timeToDie"

type InitialStateType = {
    statusApp: RequestStatusType
    authTimeStatus:AuthTimeStatusType
}

const initialState: InitialStateType = {
    statusApp: 'idle',
    authTimeStatus:"idle"

}

 const appSlice=createSlice({
    name:'app',
    initialState,
    reducers:{
        setAppStatus:(state:Draft<InitialStateType>, action:PayloadAction<RequestStatusType>)=>{
            state.statusApp=action.payload
        },
        setIsAuthTime:(state:Draft<InitialStateType>, action:PayloadAction<AuthTimeStatusType>)=>{
            state.authTimeStatus=action.payload
        }
    }
})

export const appReducer =appSlice.reducer
export const actionsApp = appSlice.actions


export const thunkApp={
    initializeApp:():AppThunk=>  (dispatch)=>{
         dispatch(thunkAuth.authMe())
    }
}