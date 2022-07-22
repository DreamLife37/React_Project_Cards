
const initialState={
    error:''
}
//обработка ошибок
export const ErrorReducer = (state=initialState,action:any) => {
  switch (action.type) {
      case 'CHANGE_ERROR':
          return {...state, error:action.payload.error}

      default: return state
  }
}

export const actions={
    changeError:(error:string)=>({type:'CHANGE_ERROR',payload:{error}}as const)
}