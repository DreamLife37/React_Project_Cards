import Typography from "@mui/material/Typography";
import * as React from "react";
import {FC, memo, useState} from "react";
import {Box, Button} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import {Path} from "../Routes";
import {Search} from "./Search";
import {useDispatchApp} from "../../CustomHooks/CustomHooks";
import {thunksCards} from "./CardsReducer";
import {AddAndEditPackModal} from "../packsList/modals/AddAndEditPackModal";
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
            <BoxToolBar>
                <BoxLeft>
                    <GoBack onClick={() => {
                        navigate(Path.packsList)
                    }}>
                        <ArrowBack/>
                        go back
                    </GoBack>
                    <Title>
                        {title}
                    </Title>
                    <SearchCard>
                        <div>Search</div>
                        <Search searchCallback={searchCard}/>
                    </SearchCard>
                </BoxLeft>
                <BoxRight>
                    <AddAndEditCardModal callback={addNewCard} handleClose={handleClose} open={open}
                                         title={'Add new card'} answer={''} question={''}/>
                    {
                        isMyPack
                            ?
                            <StyledButton onClick={handleOpen} color="inherit" variant='contained'>
                                Add new card
                            </StyledButton>
                            :
                            <></>
                    }
                </BoxRight>
            </BoxToolBar>
        );
    }
)

const StyledButton = styled(Button)`
  color: #050505;
  border-radius: 30px;
`

const BoxToolBar = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  min-height: 30vh;
`
const BoxRight = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`
const BoxLeft = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
`

const GoBack = styled(Typography)`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`
const Title = styled(Typography)`
  display: flex;
  flex-direction: row;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 27px;
`

const SearchCard = styled(Typography)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  row-gap: 5px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
`



