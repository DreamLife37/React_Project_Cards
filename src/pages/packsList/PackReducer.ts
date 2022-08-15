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
import {HeadCell} from "../../common/components/table/CommonTable";
import {actionsApp} from "../app/app-reducer";

type InitialStateType = {
    packsData: GetCardsPackResponse | Record<string, never>
    queryParams: getCardPacksPayload | Record<string, never>,
    isMyPacks: boolean,
    initHeadCells: HeadCell[]
}

const initialState: InitialStateType = {
    packsData: {},
    queryParams: {},
    isMyPacks: true,
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
        getPack: (state, action: PayloadAction<GetCardsPackResponse>) => {
            state.packsData = action.payload
        },
        setQuery: (state, action: PayloadAction<getCardPacksPayload | {}>) => {
            //если передан пустой объект, то замещает им объект с параметрами
            if (Object.keys(action.payload).length === 0) {
                state.queryParams = action.payload
            } else {
                //если не пустой объект то дополняет старый объект новым
                state.queryParams = {...state.queryParams, ...action.payload}
            }

        },
        filterMyPacks: (state, action) => {
            state.isMyPacks = action.payload
        },
        updateHeadCell: (state, action: PayloadAction<HeadCell>) => {
            state.initHeadCells = state.initHeadCells.map(HeadCell =>
                action.payload.id === HeadCell.id ?
                    action.payload
                    : HeadCell)
        },
    }
})

export const packs = packsSlice.reducer
export const actionsPacks = packsSlice.actions

export const thunksPack = {
    getPack: (lastPromise?: Promise<any>): AppThunk => (dispatch: AppDispatchType, getState) => {
        //здесь включается статус не дожидаясь когда запустится Promise.allSettled
        dispatch(actionsApp.setAppStatus("loading"))
        Promise.allSettled([lastPromise])
            .then((value) => {
                //если предыдущий промис успешен то запрашивает колоды
                //если нет, диспачит ошибку и выключает статус
                if (value[0].status === "fulfilled") {
                    const promise = APIPacks.getCardPacks(getState().packs.queryParams)
                        .then((response: GetCardsPackResponse) => {
                                dispatch(actionsPacks.getPack(response))
                            }
                        )
                    HandleToggleStatusAppAndInterceptorErrors(dispatch, [promise, lastPromise])
                } else {
                    HandleToggleStatusAppAndInterceptorErrors(dispatch, [lastPromise])
                }
            })
    },

    createPack: (payload: CreateNewCardPackPayload): AppThunk => (dispatch) => {
        const response = APIPacks.createNewCardPack(payload)
        dispatch(thunksPack.getPack(response))
    },

    updatePack: (payload: UpdateCardPackPayload): AppThunk => (dispatch) => {
        const response = APIPacks.updateCardPack(payload)
        dispatch(thunksPack.getPack(response))
    },

    deletePack: (packId: string): AppThunk => (dispatch) => {
        const response = APIPacks.deleteCardPack(packId)
        dispatch(thunksPack.getPack(response))
    },
    searchOnName: (packName: string): AppThunk => (dispatch) => {
        //ни чего больше писать не надо все случится автоматически
        //нужно только поменять в стейте квери параметр и вызвать санку getPack
        dispatch(actionsPacks.setQuery({packName}))
        dispatch(thunksPack.getPack())
    },
    filterMyPacks: (user_id: string): AppThunk => (dispatch) => {
        dispatch(actionsPacks.setQuery({user_id}))
        dispatch(thunksPack.getPack())
    },

    sortPack: (headCell: HeadCell): AppThunk => (dispatch) => {
        dispatch(actionsPacks.updateHeadCell(headCell))
        dispatch(actionsPacks.setQuery({sortPacks: headCell.order + headCell.id}))
        dispatch(thunksPack.getPack())
    },

    sortPackMinMax: (min: number, max: number): AppThunk => (dispatch) => {
        dispatch(actionsPacks.setQuery({min, max}))
        dispatch(thunksPack.getPack())
    },
    setPage: (page: number): AppThunk => (dispatch) => {
        dispatch(actionsPacks.setQuery({page}))
        dispatch(thunksPack.getPack())
    },
    setPageCount: (pageCount: number): AppThunk => (dispatch) => {
        dispatch(actionsPacks.setQuery({pageCount}))
        dispatch(thunksPack.getPack())
    }
}