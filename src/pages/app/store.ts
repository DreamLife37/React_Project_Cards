import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {authReducer} from "../auth/auth-reducer";
import thunk from "redux-thunk";
import {ErrorReducer} from "../../Errors/ErrorsReducer";

const reducers = combineReducers({
    auth: authReducer,
    error:ErrorReducer
})

export const store = legacy_createStore(reducers, applyMiddleware(thunk))

export type AppStoreType = ReturnType<typeof reducers>