import {Search} from "./Search";
import {FilterMyPacks} from "./FilterMyPacks";
import {NumberOfCards} from "./NumberOfCards";
import {TablePacks} from "./TablePacks";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as React from "react";

import {useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {useEffect} from "react";
import {thunksPack} from "./PackReducer";

export const PacksListPage = () => {

    const cardPackEntity= useSelectorApp(state => state.packs.packsData.cardPacks)

   const dispatch =useDispatchApp()
    useEffect(()=>{
        dispatch(thunksPack.getPack())
    }, [])


    const Addnewpack = () => {
        dispatch(thunksPack.createPack({name: 'azaza!!!'}))
    }

    const sort =()=>{
        dispatch(thunksPack.sortPack('1updated'))
    }

    return (
        <Grid container spacing={2} justifyContent='center' columnSpacing={{xs: 1, sm: 2, md: 3}}>
            <Grid container alignItems="center" direction="row"
                  justifyContent="center"><Grid item xs={6}>PacksList</Grid>
                <Grid item xs={6}>


                    <Button onClick={sort} variant={'contained'} color={'primary'}>
                        Add new pack
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
                <TablePacks rows={!!cardPackEntity?cardPackEntity:[]}/>
            </Grid>
        </Grid>
    )
}