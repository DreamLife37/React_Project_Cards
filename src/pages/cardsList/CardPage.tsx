
import * as React from "react";
import {useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {useEffect} from "react";
import {actionsCards, thunksCards} from "./CardsReducer";
import {TableCards} from "./TableCards";



export const CardPage = () => {

    const cards=useSelectorApp(state => state.cards.cards.cards)
    const headCells=useSelectorApp(state => state.cards.initHeadCells)

    const dispatch =useDispatchApp()

    useEffect(()=>{
            dispatch(thunksCards.getCards())
        return()=>{
              dispatch(actionsCards.getCards({}))
        }
    }, [])

    return (
                <TableCards  cards={!!cards?cards:[]} headCells={headCells}/>
    )
}



