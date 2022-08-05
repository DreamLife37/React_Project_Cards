
import * as React from "react";
import {useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {useEffect} from "react";
import {thunksCards} from "./CardsReducer";
import {TableCards} from "./TableCards";



export const CardPage = () => {

    const cardsPack_id=useSelectorApp(state => state.cards.queryParams.cardsPack_id)
    const cards=useSelectorApp(state => state.cards.cards.cards)
    const headCells=useSelectorApp(state => state.cards.initHeadCells)

    const dispatch =useDispatchApp()

    useEffect(()=>{
            dispatch(thunksCards.getCards())
    }, [])

    const createNewCard = () => {
      dispatch(thunksCards.createCard({cardsPack_id,question:'azaza??'}))
    }
    return (
                <TableCards  cards={!!cards?cards:[]} headCells={headCells}/>
    )
}



