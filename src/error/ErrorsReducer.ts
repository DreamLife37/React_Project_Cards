// import {InferActionsType} from "../pages/app/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState={
    errors:[] as string[]
}

  const errorSlice= createSlice({
    name:'ERROR',
    initialState: initialState,
    reducers:{
        changeError:(state,action:PayloadAction<string>)=>{
            state.errors.push(action.payload)
        },
        clearErrors:(state)=>{
            state.errors=[]
        }
    }
})

export const ErrorReducer =errorSlice.reducer
export const actionsErrors=errorSlice.actions
