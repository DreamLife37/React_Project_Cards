import {createSlice, PayloadAction} from "@reduxjs/toolkit";
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

type Numeric = "inherit" | "right" | "left" | "center" | "justify" | undefined;

export interface HeadCell {
    numeric: Numeric
    id: keyof ExtendedCardEntity;
    label: string;
    order: "0" | "1"
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
            order: "0"
        },
        {
            id: 'answer',
            numeric: "center",
            label: 'answer',
            order: "0"
        },
        {
            id: 'updated',
            numeric: "center",
            label: 'Last Updated',
            order: "0"
        },
        {
            id: 'grade',
            numeric: "center",
            label: 'grade',
            order: "0"
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
    getCards: (responseMore?: any): AppThunk => (dispatch, getState) => {
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

        Promise.allSettled([responseMore])
            .then(() => {
                const response = APICards.getCards(getState().cards.queryParams)
                    .then((response) => {
                        dispatch(actionsCards.getCards(response))

                    })
                HandleToggleStatusAppAndInterceptorErrors(dispatch, [responseMore, response])
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
    sortCards: (headCell:HeadCell): AppThunk => (dispatch) => {
        dispatch(actionsCards.updateHeadCell(headCell))
        dispatch(actionsCards.setQueryParams({sortCards:headCell.order+headCell.id}))
        dispatch(thunksCards.getCards())
    },
    searchCard:(cardQuestion:string):AppThunk=>(dispatch)=>{
        dispatch(actionsCards.setQueryParams({cardQuestion}))
        dispatch(thunksCards.getCards())
    }


}