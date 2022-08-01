import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {APIPacks, CardPacksEntity} from "../../DAL/API-CardsPack";
import {Dispatch} from "redux";
import {handlerNetworkError} from "../../utils/HandlerErrorsUtils";
import {HandleToggleStatusAppAndInterceptorErrors} from "../../utils/HandleToggleStatusAppAndInterceptorErrors";

const packsSlice = createSlice({
    name: 'PACKS',
    initialState: [{}] as CardPacksEntity[],
    reducers: {
        setPacksData: (state, action: PayloadAction<Array<CardPacksEntity>>) => {
            Object.assign(state, action.payload);
        }
    }
})

export const packsReducer = packsSlice.reducer
export const actionsPack = packsSlice.actions


export const getPacks = (dataPacks?: CardPacksEntity) => (dispatch: Dispatch) => {
    const response = APIPacks.getCardPacks({user_id: "62df6bbf0b95cb7f2c3e41d2"})
        .then((res) => {
            console.log(res)
            dispatch(actionsPack.setPacksData(res.cardPacks))
        })
        .catch(err => {
            handlerNetworkError(dispatch, err)
        })
    //утилитка переключения  статуса Апп
    //если вызвать в try то сработает только при успешном запросе
    HandleToggleStatusAppAndInterceptorErrors(dispatch, [response])
}

export const createPack = (dataPacks?: CardPacksEntity) => (dispatch: Dispatch) => {
    const response = APIPacks.createNewCardPack({name: "Test pack 31.07.2022"})
        .then((res) => {
            console.log(res)
            // @ts-ignore
            dispatch(getPacks())
        })
        .catch(err => {
            handlerNetworkError(dispatch, err)
        })
    //утилитка переключения  статуса Апп
    //если вызвать в try то сработает только при успешном запросе
    HandleToggleStatusAppAndInterceptorErrors(dispatch, [response])
}