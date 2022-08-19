import {Search} from "./Search";
import {FilterMyPacks} from "./FilterMyPacks";
import {NumberOfCards} from "./NumberOfCards";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useDispatchApp, useSelectorApp} from "../../customHooks/CustomHooks";
import {useEffect, useState} from "react";
import {actionsPacks, thunksPack} from "./PackReducer";
import {styled} from "@mui/material/styles";
import {TablePacks} from "./TablePacks";
import {ModalFormikPackType} from "./modals/FormikFormPackModal";
import {AddAndEditPackModal} from "./modals/AddAndEditPackModal";
import {NavigateIfNotAuthorised} from "../../common/HOC/NavigateIfNotAuthorised";

export const PacksListPage = NavigateIfNotAuthorised( () => {

    const cardPackEntity = useSelectorApp(state => state.packs.packsData.cardPacks)
    const headCells = useSelectorApp(state => state.packs.initHeadCells)
    const isAuthorized = useSelectorApp(state => state.auth.authData.isAuthorized)

    const dispatch = useDispatchApp()

    const [open, setOpen] = useState(false)
    const handleOpen = (): void => setOpen(true)
    const handleClose = (): void => setOpen(false)

    useEffect(()=>{
        dispatch(thunksPack.getPack())
        return ()=>{
            dispatch(actionsPacks.setQuery({}))
        }
    },[])

    const addNewPack = (payload: ModalFormikPackType) => {

        dispatch(thunksPack.createPack(payload))
    }

    const StyledButton = styled(Button)`
      color: #050505;
      border-radius: 30px;
    `
    return (
        <Grid container spacing={2} justifyContent='center' columnSpacing={{xs: 1, sm: 2, md: 3}}>
            <Grid container alignItems="center" direction="row"
                  justifyContent="center" paddingTop={'40px'}>
                <Grid item xs={6}>PacksList</Grid>
                {isAuthorized &&
                    <Grid item xs={6}>
                        <AddAndEditPackModal callback={addNewPack} deckCover={null} handleClose={handleClose} open={open}
                                             title={'Add new pack'} privatePack={false} namePack={''}/>
                        <StyledButton color="inherit" variant='contained' onClick={handleOpen}>
                            Add new pack
                        </StyledButton>
                    </Grid>}
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
                {isAuthorized && <Grid item xs={2}>
                    <Grid container alignItems="center" direction="row"
                          justifyContent="center">
                        <Typography
                            sx={{flex: '1 1 100%'}}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                            paddingBottom={'30px'}
                        >
                            Show packs cards
                        </Typography>
                        <FilterMyPacks/>
                    </Grid>
                </Grid>}
                <Grid item xs={2}>
                    <Grid container alignItems="center" direction="row"
                          justifyContent="center">
                        <Typography
                            sx={{flex: '1 1 100%'}}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                            paddingBottom={'30px'}
                        >
                            Number of cards
                        </Typography>
                        <NumberOfCards/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={10}>
                <TablePacks packs={!!cardPackEntity ? cardPackEntity : []} headCells={headCells}/>
            </Grid>
        </Grid>
    )
})