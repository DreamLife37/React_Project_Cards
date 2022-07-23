import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {actionsAuth, authReducer} from "../auth/auth-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {actionsErrors, ErrorReducer} from "../../Errors/ErrorsReducer";

const reducers = combineReducers({
    auth: authReducer,
    error:ErrorReducer
})

export const store = legacy_createStore(reducers, applyMiddleware(thunk))

export type AppStoreType = ReturnType<typeof reducers>
//динамическая типизация экшенов, работает только когда экшены лежат в объекте
export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type UnionActionsType = InferActionsType<typeof actionsAuth| typeof actionsErrors >
export type AppDispatchType = ThunkDispatch<AppStoreType, unknown, UnionActionsType>
export type AppThunk<ReturnType=any> = ThunkAction<ReturnType, AppStoreType, unknown, UnionActionsType>