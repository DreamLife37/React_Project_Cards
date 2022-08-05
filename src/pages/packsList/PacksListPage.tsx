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
import {styled} from "@mui/material/styles";
import {TablePacks1} from "./TablePacks1";

export const PacksListPage = () => {

    const cardPackEntity = useSelectorApp(state => state.packs.packsData.cardPacks)
    const headCells = useSelectorApp(state => state.packs.initHeadCells)
    //если этот юзеффект убрать то двойная перерисовка пропадет
    const dispatch = useDispatchApp()
    useEffect(() => {
        dispatch(thunksPack.getPack())
    }, [])

    const AddNewPack = () => {
        dispatch(thunksPack.createPack({name: 'програмист! иди спать, ты пьян!'}))
    }

    const StyledButton = styled(Button)`
      color: #050505;
      border-radius: 30px;
    `

    return (
        <Grid container spacing={2} justifyContent='center' columnSpacing={{xs: 1, sm: 2, md: 3}}>
            <Grid container alignItems="center" direction="row"
                  justifyContent="center" paddingTop={'40px'}><Grid item xs={6}>PacksList</Grid>
                <Grid item xs={6}>

                    <StyledButton onClick={AddNewPack} color="inherit" variant='contained'>
                        Add new pack
                    </StyledButton>

                </Grid>
            </Grid>
            <Grid container alignItems="flex-start" direction="row"
                  justifyContent="center"
                  paddingTop={'40px'}
            >
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
                <TablePacks1 packs={!!cardPackEntity ? cardPackEntity : []} headCells={headCells}/>
            </Grid>
        </Grid>
    )
}