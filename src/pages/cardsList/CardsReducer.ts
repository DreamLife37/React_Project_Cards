import {createSlice} from "@reduxjs/toolkit";
import {APICards, getCardsPayload, GetCardsResponse} from "../../DAL/API-Cards";
import {AppThunk} from "../app/store";

const initialState={
    cards:{} as GetCardsResponse,
    queryParams:{
        cardAnswer: undefined,
        cardQuestion: undefined,
        cardsPack_id: "undefined",
        sortCards: undefined,
        page: undefined,
        pageCount: undefined,
        min: undefined,
        max: undefined
    } as getCardsPayload
}


const cardsSlice=createSlice({
    name:"Cards",
    initialState,
    reducers:{
        getCards:(state,action)=>{
            state.cards=action.payload
        }
    }
})



export  const cards=cardsSlice.reducer
export const actionsCards=cardsSlice.actions

export const thunksCards={
    getCards:(cardsPack_id:string,response?:any):AppThunk=>(dispatch,getState)=>{
        Promise.allSettled([response])
            .then(()=>{
                const response=APICards.getCards({...getState().cards.queryParams,cardsPack_id})
                    .then((response)=>{
                        dispatch(actionsCards.getCards(response))
                    })
            })
    }
}