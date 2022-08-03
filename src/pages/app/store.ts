import {combineReducers} from "redux";

import {actionsAuth, authReducer} from "../auth/auth-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {actionsErrors, ErrorReducer} from "../../Errors/ErrorsReducer";
import {appReducer} from "./app-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {packs} from "../packsList/PackReducer";
import {cards} from "../cardsList/CardsReducer";
import {saveInStorage} from "../../utils/LocalStorageUtils";



const reducers = combineReducers({
    auth: authReducer,
    error: ErrorReducer,
    app: appReducer,
    packs,
    cards

})


export let store = configureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
    }
)

export type AppStoreType = ReturnType<typeof reducers>

//динамическая типизация экшенов, работает только когда экшены лежат в объекте
export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type UnionActionsType = InferActionsType<typeof actionsAuth | typeof actionsErrors>
export type AppDispatchType = ThunkDispatch<AppStoreType, unknown, UnionActionsType>
export type AppThunk<ReturnType = any> = ThunkAction<ReturnType, AppStoreType, unknown, UnionActionsType>

store.subscribe(()=>{
    //пилит в лок.хранилище id колоды чтобы после перезагрузки не терялась
    if (!store.getState().cards.queryParams.cardsPack_id){return}
    saveInStorage("cardsPack_id",store.getState().cards.queryParams.cardsPack_id)
    //то же самое но названием пакета
    if (!store.getState().cards.packTitle){return}
    saveInStorage("packName", store.getState().cards.packTitle)
})

// @ts-ignore
window.store = store;
