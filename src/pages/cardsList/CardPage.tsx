
import {Box} from "@mui/material";
import * as React from "react";
import {useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {useEffect} from "react";
import {thunksCards} from "./CardsReducer";
import {TableCards} from "./TableCards";
import {styled} from "@mui/material/styles";


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
        <CardPageBox>
                <TableCards cards={!!cards?cards:[]} headCells={headCells}/>
        </CardPageBox>
    )
}

const CardPageBox=styled(Box)`
  background-color: #f5f1f1;
  min-width: 900px;
  
  
`