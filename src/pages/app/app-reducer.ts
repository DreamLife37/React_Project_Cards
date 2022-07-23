const initialState: InitialStateType = {
    status: 'loading'
}
type InitialStateType = {
    status: RequestStatusType
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-APP-STATUS':
            return {...state}
        default: {
            return {...state};
        }
    }
}

export const setAppStatus = (status: RequestStatusType) => {
    return {type: 'SET-APP-STATUS', status} as const
}

export type setAppStatusActionType = ReturnType<typeof setAppStatus>


type ActionsType = setAppStatusActionType