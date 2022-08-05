import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    APIPacks, CardPacksEntityWithDeckCover,
    CreateNewCardPackPayload,
    getCardPacksPayload,
    GetCardsPackResponse,
    UpdateCardPackPayload
} from "../../DAL/API-CardsPack";
import {AppDispatchType, AppThunk} from "../app/store";
import {HandleToggleStatusAppAndInterceptorErrors} from "../../utils/HandleToggleStatusAppAndInterceptorErrors";
import {ExtendedCardEntity, getCardsPayload, GetCardsResponse} from "../../DAL/API-Cards";


type InitialState = {
    packsData: GetCardsPackResponse
    queryParams: getCardPacksPayload
    initHeadCells: HeadCell[]
}


//type Numeric = "inherit" | "right" | "left" | "center" | "justify" | undefined;

export interface HeadCell {
    numeric: "inherit" | "right" | "left" | "center" | "justify" | undefined;
    //id: keyof CardPacksEntityWithDeckCover|"action";
    id: string,
    label: string;
    order: "0" | "1"|undefined
}


const initialState: InitialState = {
    packsData: {} as GetCardsPackResponse,
    queryParams: {
        packName: undefined,
        min: undefined,
        max: undefined,
        page: undefined,
        pageCount: undefined,
        user_id: undefined,
        sortPacks: undefined
    } as getCardPacksPayload,
    initHeadCells: [
        {
            id: 'name',
            numeric: "center",
            label: 'Name',
            order: "1"
        },
        {
            id: 'cardsCount',
            numeric: "center",
            label: 'Cards',
            order: "1"
        },
        {
            id: 'updated',
            numeric: "center",
            label: 'Last Updated',
            order: "1"
        },
        {
            id: 'created',
            numeric: "center",
            label: 'Created by',
            order: "1"
        },
        {
            id: 'action',
            numeric: "center",
            label: 'Action',
            order: undefined
        },
    ]
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
    sortPackMinMax: (min: number, max: number): AppThunk => (dispatch: AppDispatchType) => {
        //ни чего больше писать не надо все случится автоматически
        //нужно только поменять в стейте квери параметр и вызвать санку getPack
        dispatch(actionsPacks.setQuery({min, max}))
        dispatch(thunksPack.getPack())
    },
    getPackWithSetQuery: (payload: getCardPacksPayload): AppThunk => (dispatch: AppDispatchType) => {
        //ни чего больше писать не надо все случится автоматически
        //нужно только поменять в стейте квери параметр и вызвать санку getPack
        dispatch(actionsPacks.setQuery(payload))
        dispatch(thunksPack.getPack())
    },

}