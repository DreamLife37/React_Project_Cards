
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as React from "react";

import {useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {useEffect} from "react";
import {thunksCards} from "./CardsReducer";
import {Search} from "./Search";
import {FilterMyPacks} from "./FilterMyPacks";
import {NumberOfCards} from "./NumberOfCards";
import {TablePacks} from "./TablePacks";
import {useNavigate} from "react-router-dom";
import {Path} from "../Routes";


export const CardPage = () => {

    const cardsPack_id=useSelectorApp(state => state.cards.queryParams.cardsPack_id)
    const cards=useSelectorApp(state => state.cards.cards.cards)

    const dispatch =useDispatchApp()
    const navigate= useNavigate()

    useEffect(()=>{
        if (!cardsPack_id){
            navigate(Path.packsList)
        }else {
            dispatch(thunksCards.getCards())
        }
    }, [cardsPack_id])

    const createNewCard = () => {
      dispatch(thunksCards.createCard({cardsPack_id,question:'azaza??'}))
    }
    return (
        <Grid container spacing={2} justifyContent='center' columnSpacing={{xs: 1, sm: 2, md: 3}}>
            <Grid container alignItems="center" direction="row"
                  justifyContent="center"><Grid item xs={6}>PacksList</Grid>
                <Grid item xs={6}>

                    <Button onClick={createNewCard} variant={'contained'} color={'primary'}>
                        Add new card
                    </Button>

                </Grid>
            </Grid>
            <Grid container alignItems="flex-start" direction="row"
                  justifyContent="center">
                <Grid item xs={4}>
                    <Grid container alignItems="center" direction="row"
                          justifyContent="center">
                        <Typography
                            sx={{flex: '1 1 100%'}}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Search
                        </Typography>
                        <Search/></Grid></Grid>
                <Grid item xs={2}>
                    <Grid container alignItems="center" direction="row"
                          justifyContent="center">
                        <Typography
                            sx={{flex: '1 1 100%'}}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Show packs cards
                        </Typography>
                        <FilterMyPacks/>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                    <Grid container alignItems="center" direction="row"
                          justifyContent="center">
                        <Typography
                            sx={{flex: '1 1 100%'}}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Number of cards
                        </Typography>
                        <NumberOfCards/></Grid>
                </Grid>
            </Grid>
            <Grid item xs={10}>
                <TablePacks rows={!!cards?cards:[]}/>
            </Grid>
        </Grid>
    )
}