
const initialState={
    errors:[] as string[]
}

type InitialStateType=typeof initialState
//обработка ошибок
export const ErrorReducer = (state:InitialStateType=initialState,action:any):InitialStateType => {
  switch (action.type) {
      case 'ADD_ERROR':
          return {...state, errors:[...state.errors,action.payload.error]}
      case 'ClEAR_ERRORS':
          return {...state, errors: []}


      default: return state
  }
}

export const actions={
    changeError:(error:string)=>({type:'ADD_ERROR',payload:{error}}as const),
    clearErrors:()=>({type:'ClEAR_ERRORS'}as const)
}