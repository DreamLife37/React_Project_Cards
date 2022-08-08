import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, Grid} from "@mui/material";
import {CustomModal} from "../../common/components/modals/CustomModal";
import {useEffect, useState} from "react";
import {useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {thunksCards} from "../cardsList/CardsReducer";


export const LearnPage = () => {

    const p=useSelectorApp(state => state.cards.cardsPack_id)

    const dispatch= useDispatchApp()



    useEffect(()=>{
        dispatch(thunksCards.getCards())
    })



  return(
      <Learn/>
  )
}


export const Learn = () => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Box display='flex' justifyContent='center'>
            <QuestionBoxStyled container>
                <LearnTitleBox item xs={2}>
                    Learn
                </LearnTitleBox>
                <LearnQuestionContentBox item xs={10}>
                    <Box>
                        <Typography>questionaafsdfgsdgdfgdfgdfgdfgdfgdfgdfgdfg</Typography>
                        <Typography sx={{opacity: 0.5}}>Shots</Typography>
                    </Box>
                    <LightStyledButton onClick={handleOpen} variant='contained'>show answer</LightStyledButton>
                </LearnQuestionContentBox>
            </QuestionBoxStyled>

            <CustomModal handleClose={handleClose} open={open} disabledStyle={true}>
                <AnswerBoxStyled container>
                    <LearnTitleBox item xs={2}>
                        Learn
                    </LearnTitleBox>
                    <LearnQuestionContentBox item xs={10}>
                        <Box>
                            <Typography>Answer</Typography>
                            <Typography sx={{opacity: 0.5}}>Shots</Typography>
                        </Box>
                        <LightStyledButton onClick={handleOpen} variant='contained'>Next</LightStyledButton>
                    </LearnQuestionContentBox>
                </AnswerBoxStyled>
            </CustomModal>
        </Box>

    )
}


const LightStyledButton = styled(Button)`
  border-radius: 50px;

`

const LearnTitleBox = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const LearnQuestionContentBox = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const QuestionBoxStyled = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 1% 1% 1% 1%;
  padding: 1% 1% 0% 1%;
  color: black;
  width: 439px;
  height: 284px;

  border-radius: 5px;
  background-color: #f0f0f3;
  //  box-shadow: 10px 10px 21px #d3d3d6;,
  //-10px -10px 21px #fff
`
const AnswerBoxStyled = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 1% 1% 1% 1%;
  padding: 1% 1% 0% 1%;
  color: black;
  width: 439px;
  height: 284px;

  position: absolute;
  top: 33.9%;
  left: 49.2%;
  transform: translate(-50%, -50%);

  border-radius: 5px;
  background-color: #f0f0f3;
  box-shadow: -10px -10px 10px #d3d3d6;,
- 10 px - 10 px 10 px #fff
`


