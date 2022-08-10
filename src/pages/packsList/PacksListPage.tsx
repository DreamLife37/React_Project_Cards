import {Search} from "./Search";
import {FilterMyPacks} from "./FilterMyPacks";
import {NumberOfCards} from "./NumberOfCards";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {useState} from "react";
import {thunksPack} from "./PackReducer";
import {styled} from "@mui/material/styles";
import {TablePacks} from "./TablePacks";
import {ModalFormikPackType} from "./modals/FormikFormPackModal";
import {AddAndEditPackModal} from "./modals/AddAndEditPackModal";

export const PacksListPage = () => {

    const cardPackEntity = useSelectorApp(state => state.packs.packsData.cardPacks)
    const headCells = useSelectorApp(state => state.packs.initHeadCells)
    const isAuthorized = useSelectorApp(state => state.auth.isAuthorized)

    const dispatch = useDispatchApp()

    const [open, setOpen] = useState(false)
    const handleOpen = (): void => setOpen(true)
    const handleClose = (): void => setOpen(false)


    const addNewPack = (e: ModalFormikPackType) => {
        dispatch(thunksPack.createPack({name: e.namePack, private: e.privatePack}))
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
                        <AddAndEditPackModal callback={addNewPack} handleClose={handleClose} open={open}
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
}