import {combineReducers} from "redux";
import {actionsAuth, authReducer, thunkAuth} from "../auth/auth-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {actionsErrors, ErrorReducer} from "../../error/ErrorsReducer";
import {actionsApp, appReducer} from "./app-reducer";
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
         //прединициализационное состояние стейта устанавливается из localStorage,
         // если localStorage ни чего не передает то передает пустой объект
        preloadedState: {auth: {authData: restoreFromStorage("authData") || {}}}
    }
)

export type AppStoreType = ReturnType<typeof reducers>

//динамическая типизация экшенов, работает только когда экшены лежат в объекте
export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type UnionActionsType = InferActionsType<typeof actionsAuth | typeof actionsErrors | typeof actionsCards | typeof actionsPacks>
export type AppDispatchType = ThunkDispatch<AppStoreType, unknown, UnionActionsType>
export type AppThunk<ReturnType = any> = ThunkAction<ReturnType, AppStoreType, unknown, UnionActionsType>

store.subscribe(() => {
    //сохраняет в localStorage аутентификационные данные из стейта при условии что authData не пуст
    if (Object.keys(store.getState().auth.authData).length !== 0) {
        saveInStorage("authData", store.getState().auth.authData)
        // console.log((store.getState().auth.authData.tokenDeathTime - Date.now()))
        // за час до конца жизни токена переводит тригер в "timeToUpdateToken" при условии что не был в этом состояние,
        // на  этот тригер реагирует useEffect  в компоненте App и вызывает санку authMe,
        // в authMe идет запрос и при успехе переводит тригер в "idle"
        if (store.getState().auth.authData.tokenDeathTime - Date.now() <= 1350000) {
            //условие нужно для того чтобы dispatch вызвался единожды, а не каждый раз при изменении стейта
            if (store.getState().app.authTimeStatus!=="timeToUpdateToken") {
                store.dispatch(actionsApp.setIsAuthTime("timeToUpdateToken"))
            }
        }
        //если время жизни токена уже истекло вылогиновает пользователя
        if (store.getState().auth.authData.tokenDeathTime - Date.now() <= 0){
            if (store.getState().app.authTimeStatus!=="timeToDie") {
                store.dispatch(actionsApp.setIsAuthTime("timeToDie"))
            }
        }
    }else{
        //если в store.getState().auth.authData передали пустой обект при вылогинивании
        // затирает значение "authData" в localStorage
        saveInStorage("authData", {})
    }

    //пилит в лок.хранилище id колоды чтобы после перезагрузки не терялась
    if (!store.getState().cards.cardsPack_id) {
        return
    }
    saveInStorage("cardsPack_id", store.getState().cards.cardsPack_id)
    //то же самое но названием пакета
    if (!store.getState().cards.packTitle) {
        return
    }
    saveInStorage("packName", store.getState().cards.packTitle)
})

// @ts-ignore
window.store = store;
