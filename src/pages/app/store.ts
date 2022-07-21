import {applyMiddleware, combineReducers, createStore} from "redux";
import {authReducer} from "../auth/auth-reducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
    auth: authReducer
})
export const store = createStore(reducers, applyMiddleware(thunk))
export type AppStoreType = ReturnType<typeof reducers>