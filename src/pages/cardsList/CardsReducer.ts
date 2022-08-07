import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {
    APICards,
    CreateCardPayload,
    ExtendedCardEntity,
    getCardsPayload,
    GetCardsResponse,
    UpdateCardPayload
} from "../../DAL/API-Cards";
import {AppThunk} from "../app/store";
import {HandleToggleStatusAppAndInterceptorErrors} from "../../utils/HandleToggleStatusAppAndInterceptorErrors";
import {restoreFromStorage} from "../../utils/LocalStorageUtils";
import {actionsErrors} from "../../Errors/ErrorsReducer";
import {actionsApp, thunkApp} from "../app/app-reducer";

type Numeric = "inherit" | "right" | "left" | "center" | "justify" | undefined;

export interface HeadCell {
    numeric: Numeric
    id: keyof ExtendedCardEntity | "action";
    label: string;
    order: "0" | "1" | undefined
}


const initialState: InitialState = {
    packTitle: '',
    cards: {} as GetCardsResponse,
    queryParams: {
        cardAnswer: undefined,
        cardQuestion: undefined,
        cardsPack_id: "",
        sortCards: undefined,
        page: undefined,
        pageCount: undefined,
        min: undefined,
        max: undefined
    },
    initHeadCells: [
        {
            id: 'question',
            numeric: "center",
            label: 'question',
            order: "1"
        },
        {
            id: 'answer',
            numeric: "center",
            label: 'answer',
            order: "1"
        },
        {
            id: 'updated',
            numeric: "center",
            label: 'Last Updated',
            order: "1"
        },
        {
            id: 'grade',
            numeric: "center",
            label: 'grade',
            order: "1"
        },
        {
            id: 'action',
            numeric: "center",
            label: 'action',
            order: undefined
        },
    ]
}

type InitialState = {
    packTitle: string
    cards: GetCardsResponse
    queryParams: getCardsPayload
    initHeadCells: HeadCell[]
}

const cardsSlice = createSlice({
    name: "Cards",
    initialState,
    reducers: {
        getCards: (state, action) => {
            state.cards = action.payload
        },
        setQueryParams: (state, action) => {
            state.queryParams = {...state.queryParams, ...action.payload}
        },
        getTitle: (state, action) => {
            state.packTitle = action.payload
        },
        updateHeadCell: (state, action) => {
            state.initHeadCells = state.initHeadCells.map(HeadCell =>
                action.payload.id === HeadCell.id ?
                    action.payload
                    : HeadCell)
        }
    }
})


export const cards = cardsSlice.reducer
export const actionsCards = cardsSlice.actions

export const thunksCards = {
    getCards: (promise?: Promise<unknown>): AppThunk => (dispatch, getState) => {
        dispatch(actionsApp.setAppStatus("loading"))
        //если cardsPack_id затерся после перезагрузки, берет его из хранилища
        if (!getState().cards.queryParams.cardsPack_id) {
            const cardsPack_id = restoreFromStorage("cardsPack_id")
            dispatch(actionsCards.setQueryParams({cardsPack_id}))
        }
        //то же самое с названием колоды
        if (!getState().packs.packsData.cardPacks) {
            const packName = restoreFromStorage("packName")
            dispatch(actionsCards.getTitle(packName))
        }

        Promise.all([promise])
            .then(() => {
                let getPromise = APICards.getCards(getState().cards.queryParams)
                    .then((response) => {
                        console.log('!!')
                        dispatch(actionsCards.getCards(response))
                    })
                HandleToggleStatusAppAndInterceptorErrors(dispatch, [promise, getPromise])
            }).catch(() => {
            HandleToggleStatusAppAndInterceptorErrors(dispatch, [promise])
        })


    },
    createCard: (createCardPayload: CreateCardPayload): AppThunk => (dispatch) => {
        const response = APICards.createCard(createCardPayload)
        dispatch(thunksCards.getCards(response))
    },
    updateCard: (updateCardPayload: UpdateCardPayload): AppThunk => (dispatch) => {
        const response = APICards.updateCard(updateCardPayload)
        dispatch(thunksCards.getCards(response))
    },
    deleteCard: (id: string): AppThunk => (dispatch) => {
        const response = APICards.deleteCard(id)
        dispatch(thunksCards.getCards(response))
    },
    sortCards: (headCell: HeadCell): AppThunk => (dispatch) => {
        dispatch(actionsCards.updateHeadCell(headCell))
        dispatch(actionsCards.setQueryParams({sortCards: headCell.order + headCell.id}))
        dispatch(thunksCards.getCards())
    },
    searchCard: (cardQuestion: string): AppThunk => (dispatch) => {
        dispatch(actionsCards.setQueryParams({cardQuestion}))
        dispatch(thunksCards.getCards())
    },
    setPage: (page: number): AppThunk => (dispatch) => {
        dispatch(actionsCards.setQueryParams({page: page + 1}))
        dispatch(thunksCards.getCards())
    },
    setPageCount: (pageCount: number): AppThunk => (dispatch) => {
        dispatch(actionsCards.setQueryParams({pageCount}))
        dispatch(thunksCards.getCards())
    }


}