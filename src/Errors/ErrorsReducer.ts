// import {InferActionsType} from "../pages/app/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState={
    errors:[] as string[]
}

// type InitialStateType=typeof initialState
// type actionsErrorsType=InferActionsType<typeof actionsErrors>


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
//     (state:InitialStateType=initialState,action:actionsErrorsType):InitialStateType => {
//   switch (action.type) {
//       case 'ADD_ERROR':
//           return {...state, errors:[...state.errors,action.payload.error]}
//
//       case 'ClEAR_ERRORS':
//           return {...state, errors: []}
//
//       default: return state
//   }
// }

export const actionsErrors=errorSlice.actions
//     {
//     changeError:(error:string)=>({type:'ADD_ERROR',payload:{error}}as const),
//     clearErrors:()=>({type:'ClEAR_ERRORS'}as const)
// }