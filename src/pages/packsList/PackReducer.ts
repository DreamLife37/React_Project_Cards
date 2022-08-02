import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    APIPacks,
    CreateNewCardPackPayload,
    getCardPacksPayload,
    GetCardsPackResponse,
    UpdateCardPackPayload
} from "../../DAL/API-CardsPack";
import {AppDispatchType, AppThunk} from "../app/store";
import {HandleToggleStatusAppAndInterceptorErrors} from "../../utils/HandleToggleStatusAppAndInterceptorErrors";

const initialState = {
    packsData: {} as GetCardsPackResponse,
    queryParams: {
        packName: undefined,
        min: undefined,
        max: undefined,
        page: undefined,
        pageCount: undefined,
        user_id: undefined,
        sortPacks: undefined
    } as getCardPacksPayload
}


const packsSlice = createSlice({
    name: "Packs",
    initialState,
    reducers: {
        getPack: (state, action) => {
            state.packsData = action.payload
        },
        setQuery: (state, action) => {
            state.queryParams = {...state.queryParams, ...action.payload}
        }
    }
})

export const packs = packsSlice.reducer
export const actionsPacks = packsSlice.actions

export const thunksPack = {
    getPack: (responseMore?: any): AppThunk => (dispatch: AppDispatchType, getState) => {
        Promise.allSettled([responseMore])
            .then(() => {
                const response = APIPacks.getCardPacks(getState().packs.queryParams)
                    .then((response: GetCardsPackResponse) => {
                            dispatch(actionsPacks.getPack(response))
                        }
                    )
                HandleToggleStatusAppAndInterceptorErrors(dispatch, [response, responseMore])
            })
    },

    createPack: (payload: CreateNewCardPackPayload): AppThunk => (dispatch: AppDispatchType) => {
        const response = APIPacks.createNewCardPack(payload)
        dispatch(thunksPack.getPack(response))
    },

    updatePack: (payload: UpdateCardPackPayload): AppThunk => (dispatch: AppDispatchType) => {
        const response = APIPacks.updateCardPack(payload)
        dispatch(thunksPack.getPack(response))
    },

    deletePack: (packId: string): AppThunk => (dispatch: AppDispatchType) => {
        const response = APIPacks.deleteCardPack(packId)
        dispatch(thunksPack.getPack(response))
    },
    searchOnName: (packName: string): AppThunk => (dispatch: AppDispatchType) => {
        //ни чего больше писать не надо все случится автоматически
        //нужно только поменять в стейте квери параметр и вызвать санку getPack
        dispatch(actionsPacks.setQuery({packName}))
        dispatch(thunksPack.getPack())
    },
    filterMyPacks: (user_id: string): AppThunk => (dispatch: AppDispatchType) => {
        //ни чего больше писать не надо все случится автоматически
        //нужно только поменять в стейте квери параметр и вызвать санку getPack
        dispatch(actionsPacks.setQuery({user_id}))
        dispatch(thunksPack.getPack())
    },
    sortPack: (sortPacks: string): AppThunk => (dispatch: AppDispatchType) => {
        //ни чего больше писать не надо все случится автоматически
        //нужно только поменять в стейте квери параметр и вызвать санку getPack
        dispatch(actionsPacks.setQuery({sortPacks}))
        dispatch(thunksPack.getPack())
    },
    sortPackMin: (min: number): AppThunk => (dispatch: AppDispatchType) => {
        //ни чего больше писать не надо все случится автоматически
        //нужно только поменять в стейте квери параметр и вызвать санку getPack
        dispatch(actionsPacks.setQuery({min}))
        dispatch(thunksPack.getPack())
    }
}