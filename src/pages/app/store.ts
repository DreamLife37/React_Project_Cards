import {combineReducers, createStore} from "redux";
import {authReducer} from "../auth/auth-reducer";

const reducers = combineReducers({
    auth: authReducer
})
export const store = createStore(reducers)
export type AppStoreType = ReturnType<typeof reducers>