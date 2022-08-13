import {combineReducers} from "redux";
import {actionsAuth, authReducer} from "../auth/auth-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {actionsErrors, ErrorReducer} from "../../error/ErrorsReducer";
import {appReducer} from "./app-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {actionsPacks, packs} from "../packsList/PackReducer";
import {actionsCards, cards} from "../cardsList/CardsReducer";
import {restoreFromStorage, saveInStorage} from "../../utils/LocalStorageUtils";



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
        preloadedState:{auth:{authData:restoreFromStorage("authData")||{}}}
    }
)

export type AppStoreType = ReturnType<typeof reducers>

//динамическая типизация экшенов, работает только когда экшены лежат в объекте
export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type UnionActionsType = InferActionsType<typeof actionsAuth | typeof actionsErrors|typeof actionsCards|typeof actionsPacks>
export type AppDispatchType = ThunkDispatch<AppStoreType, unknown, UnionActionsType>
export type AppThunk<ReturnType = any> = ThunkAction<ReturnType, AppStoreType, unknown, UnionActionsType>

store.subscribe(()=>{
    //сохраняет в localStorage аутентификационные данные из стейта при условии что authData не пуста
    if(Object.keys(store.getState().auth.authData).length!==0){
        saveInStorage("authData",store.getState().auth.authData)
        console.log(store.getState().auth.authData.tokenDeathTime-Date.now())
        //когда время жизни токена истечет переведет isAuthorized в false в следствие этого я надеюсь приложение
        //отреагирует редиректом на LoginPage
        if(store.getState().auth.authData.tokenDeathTime-Date.now()<=0){
            saveInStorage("authData", {...store.getState().auth.authData,isAuthorized:false})
        }
    }


    //пилит в лок.хранилище id колоды чтобы после перезагрузки не терялась
    if (!store.getState().cards.cardsPack_id){return}
    saveInStorage("cardsPack_id",store.getState().cards.cardsPack_id)
    //то же самое но названием пакета
    if (!store.getState().cards.packTitle){return}
    saveInStorage("packName", store.getState().cards.packTitle)

})

// @ts-ignore
window.store = store;
