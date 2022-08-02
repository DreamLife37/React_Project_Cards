import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {APICards, CreateCardPayload, getCardsPayload, GetCardsResponse, UpdateCardPayload} from "../../DAL/API-Cards";
import {AppThunk} from "../app/store";
import {HandleToggleStatusAppAndInterceptorErrors} from "../../utils/HandleToggleStatusAppAndInterceptorErrors";
import {restoreFromStorage} from "../../utils/LocalStorageUtils";

const initialState:InitialState={
    cards:{} as  GetCardsResponse,
    queryParams:{
        cardAnswer: undefined,
        cardQuestion: undefined,
        cardsPack_id: "",
        sortCards: undefined,
        page: undefined,
        pageCount: undefined,
        min: undefined,
        max: undefined
    }
}
type InitialState= {
    cards:GetCardsResponse
    queryParams:getCardsPayload
}

const cardsSlice=createSlice({
    name:"Cards",
    initialState,
    reducers:{
        getCards:(state,action)=>{
            state.cards=action.payload
        },
        setQueryParams:(state,action)=>{
            state.queryParams={...state.queryParams, ...action.payload}
        }
    }
})



export  const cards=cardsSlice.reducer
export const actionsCards=cardsSlice.actions

export const thunksCards={
    getCards:(responseMore?:any):AppThunk=>(dispatch,getState)=>{

        if(!getState().cards.queryParams.cardsPack_id){
            const cardsPack_id= restoreFromStorage("cardsPack_id")
            dispatch(actionsCards.setQueryParams({cardsPack_id}))
        }

        Promise.allSettled([responseMore])
            .then(()=>{
                const response=APICards.getCards(getState().cards.queryParams)
                    .then((response)=>{
                        dispatch(actionsCards.getCards(response))
                    })
                HandleToggleStatusAppAndInterceptorErrors(dispatch,[responseMore,response])
            })
    },
    createCard:(createCardPayload: CreateCardPayload):AppThunk=>(dispatch)=>{
        const response=APICards.createCard(createCardPayload)
        dispatch(thunksCards.getCards(response))
    },
    updateCard:(updateCardPayload: UpdateCardPayload):AppThunk=>(dispatch)=>{
        const response=APICards.updateCard(updateCardPayload)
        dispatch(thunksCards.getCards(response))
    },
    deleteCard:(id:string):AppThunk=>(dispatch)=>{
        const response = APICards.deleteCard(id)
        dispatch(thunksCards.getCards(response))
    }
}