import {Search} from "./Search";
import {FilterMyPacks} from "./FilterMyPacks";
import {NumberOfCards} from "./NumberOfCards";
import {TablePacks} from "./TablePacks";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {createPack, getPacks} from "./packs-reducer";
import {useEffect} from "react";

export const PacksListPage = () => {
    const dispatch = useDispatchApp()

    interface Data {
        calories: number;
        carbs: number;
        fat: number;
        name: string;
        protein: number;
    }

    const rows = useSelectorApp(state => state.packs)

    useEffect(() => {
        dispatch(getPacks());
    }, [dispatch]);

    return (
        <Grid container spacing={2} justifyContent='center' columnSpacing={{xs: 1, sm: 2, md: 3}}>
            <Grid container alignItems="center" direction="row"
                  justifyContent="center" padding={'15px'}>
                <Grid item xs={6}>PacksList</Grid>
                <Grid item xs={6}>
                    <Button variant={'contained'} color={'primary'} onClick={() => dispatch(createPack())}>
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
                        > Search
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
                        > Show packs cards
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
                        > Number of cards
                        </Typography>
                        <NumberOfCards/></Grid>
                </Grid>
            </Grid>
            <Grid item xs={10}>
                <TablePacks rows={rows}/>
            </Grid>
        </Grid>
    )
}