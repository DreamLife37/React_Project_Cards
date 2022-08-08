import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    APICards,
    CreateCardPayload,
    GetCardsResponse,
    UpdateCardPayload
} from "../../DAL/API-Cards";
import {AppThunk} from "../app/store";
import {restoreFromStorage} from "../../utils/LocalStorageUtils";
import {handlerNetworkError} from "../../utils/HandlerErrorsUtils";
import {HeadCell} from "../../common/components/table/CommonTable";


type QueryParamsT = {
    cardAnswer?: string,
    cardQuestion?: string,
    min?: number,
    max?: number,
    sortCards?: string,
    page?: number,
    pageCount?: number
}


const initialState = {
    packTitle: '' as string,
    cards: {} as GetCardsResponse | Record<string, never>,
    cardsPack_id: "",
    queryParams: {} as QueryParamsT,
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
    ] as HeadCell[],
    requestPendingList: {} as { [CardId: string]: boolean } | Record<string, never>,
    statusCards: 'loading' as 'idle' | 'loading'
}

const cardsSlice = createSlice({
    name: "Cards",
    initialState,
    reducers: {
        getCards: (state, action: PayloadAction<GetCardsResponse | {}>) => {
            state.cards = action.payload
        },
        setQueryParams: (state, action: PayloadAction<QueryParamsT>) => {
            state.queryParams = {...state.queryParams, ...action.payload}
        },
        getTitle: (state, action: PayloadAction<string>) => {
            state.packTitle = action.payload
        },
        updateHeadCell: (state, action: PayloadAction<HeadCell>) => {
            state.initHeadCells = state.initHeadCells.map(HeadCell =>
                action.payload.id === HeadCell.id ?
                    action.payload
                    : HeadCell)
        },
        //добавляет id карты в лист ожидания
        setRequestPendingList: (state, action: PayloadAction<string>) => {
            state.requestPendingList = {...state.requestPendingList, [action.payload]: true}
        },
        //удаляет id карты из листа ожидания
        deleteIdInRequestPendingList: (state, action: PayloadAction<string>) => {
            delete state.requestPendingList[action.payload]
        },
        setStatusCards: (state, action: PayloadAction<'idle' | 'loading'>) => {
            state.statusCards = action.payload
        },
        setPackId: (state, action: PayloadAction<string>) => {
            state.cardsPack_id = action.payload
        }
    }

})


export const cards = cardsSlice.reducer
export const actionsCards = cardsSlice.actions

export const thunksCards = {
    getCards: (promise?: Promise<unknown>, cardId?: string): AppThunk => (dispatch, getState) => {
        //если cardsPack_id затерся после перезагрузки, берет его из хранилища
        if (!getState().cards.cardsPack_id) {
            const cardsPack_id: string = restoreFromStorage("cardsPack_id")
            dispatch(actionsCards.setPackId(cardsPack_id))
        }
        //то же самое с названием колоды
        if (!getState().packs.packsData.cardPacks) {
            const packName = restoreFromStorage("packName")
            dispatch(actionsCards.getTitle(packName))
        }
        dispatch(actionsCards.setStatusCards("loading"))
        Promise.all([promise])
            .then(() => {
                APICards.getCards({...getState().cards.queryParams, cardsPack_id: getState().cards.cardsPack_id})
                    .then((response) => {
                        dispatch(actionsCards.getCards(response))
                        dispatch(actionsCards.setStatusCards("idle"))
                        if (!!cardId) {
                            dispatch(actionsCards.deleteIdInRequestPendingList(cardId))
                        }
                    }).catch((e) => {
                    handlerNetworkError(dispatch, e)
                    dispatch(actionsCards.setStatusCards("idle"))
                })

            }).catch((e) => {
            handlerNetworkError(dispatch, e)
            dispatch(actionsCards.setStatusCards("idle"))
            if (!!cardId) {
                dispatch(actionsCards.deleteIdInRequestPendingList(cardId))
            }
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
        dispatch(actionsCards.setRequestPendingList(id))
        const response = APICards.deleteCard(id)
        dispatch(thunksCards.getCards(response, id))
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