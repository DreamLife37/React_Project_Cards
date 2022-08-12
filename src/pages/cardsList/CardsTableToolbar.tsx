import Typography from "@mui/material/Typography";
import * as React from "react";
import {FC, memo, useState} from "react";
import {Button, Grid} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import {Path} from "../Routes";
import {Search} from "./Search";
import {useDispatchApp} from "../../customHooks/CustomHooks";
import {thunksCards} from "./CardsReducer";
import {AddAndEditCardModal} from "./modals/AddAndEditCardModal";
import {ModalFormikCardType} from "./modals/FormikFormCardModal";

type EnhancedTableToolbar = {
    title: string
    cardsPack_id: string
    isMyPack: boolean
}

export const CardsTableToolbar: FC<EnhancedTableToolbar> = memo(({isMyPack, title, cardsPack_id}) => {

        const [open, setOpen] = useState(false)
        const handleOpen = (): void => setOpen(true)
        const handleClose = (): void => setOpen(false)

        const navigate = useNavigate()
        const dispatch = useDispatchApp()

        const addNewCard = (e: ModalFormikCardType) => {
            dispatch(thunksCards.createCard({cardsPack_id, question: e.question, answer: e.answer}))
        }

        const searchCard = (cardQuestion: string) => {
            dispatch(thunksCards.searchCard(cardQuestion))
        }

        return (
            <Grid container spacing={2} justifyContent='center' columns={10}>
                <Grid container alignItems="center" direction="row"
                      justifyContent="center" paddingTop={'40px'}>
                    <Grid item xs={6}>{title}</Grid>
                    <Grid item xs={6}>
                        <AddAndEditCardModal callback={addNewCard} handleClose={handleClose} open={open}
                                             title={'Add new card'} answer={''} question={''}/>
                        {isMyPack && <StyledButton onClick={handleOpen} color="inherit" variant='contained'>
                            Add new card
                        </StyledButton>}
                    </Grid>
                </Grid>
                <Grid container alignItems="flex-start" direction="row"
                      justifyContent="center"
                      paddingTop={'40px'}
                >
                    <Grid item xs={5}>
                        <Grid container alignItems="center" direction="row"
                              justifyContent="center">
                            <Typography
                                style={{cursor: 'pointer'}}
                                sx={{flex: '1 1 100%'}}
                                component="div"
                                onClick={() => {
                                    navigate(Path.packsList)
                                }}
                            >
                                <ArrowBack/>
                                Back to Pack List
                            </Typography>

                        </Grid>
                    </Grid>

                    <Grid item xs={6} marginBottom={'20px'}>
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
                            <Search searchCallback={searchCard}/>
                        </Grid>
                    </Grid>


                    <Grid item xs={2}>

                    </Grid>
                </Grid>
            </Grid>
        );
    }
)


const StyledButton = styled(Button)`
  color: #050505;
  border-radius: 30px;
`