import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import * as React from "react";
import {FC, memo, useCallback, useMemo} from "react";
import {Button, CircularProgress, FormControlLabel, FormGroup} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import {CustomModal} from "../../common/components/modals/CustomModal";
import {ExtendedCardEntity} from "../../DAL/API-Cards";

type LearnPropsType = {
    randomCard: ExtendedCardEntity
    packTitle: string
    currentGrade: string
    setCurrentGrade: (grade: string) => void
    handleNextCard: (gradeNumber: number) => void
    setOpen: (open: boolean) => void
    open: boolean
    grades: string[]
    statusCards: "idle" | "loading"
}
export const Learn: FC<LearnPropsType> = memo((props) => {

        //конвертирует оценку в число
        const gradeNumber = useMemo(() =>
                props.grades.findIndex((grade) => grade === props.currentGrade) + 1
            , [props.currentGrade])

        const onNext = useCallback(() => {
            props.handleNextCard(gradeNumber)
        }, [gradeNumber])

        //меняет текущую оценку
        const onGrade = useCallback((grade: string) => () => {
            props.setCurrentGrade(grade)
        }, [])


        const handleOpen = () => {
            props.setOpen(true)
        }
        const handleClose = () => {
            props.setOpen(false)
        }

        const formControlLabelMapped = useMemo(() => props.grades.map((grade, i) =>
                <FormControlLabel key={grade + i}
                                  control={
                                      <Checkbox size='small'
                                                onChange={onGrade(grade)}
                                                checked={props.currentGrade === grade}/>
                                  }
                                  label={grade}/>)
            , [props.currentGrade])


        return (
            <Box display='flex' justifyContent='center'>

                <QuestionBoxStyled>

                    <LearnTitleBox>
                        <Typography variant={"h6"}>{props.packTitle}</Typography>
                    </LearnTitleBox>
                    <LearnQuestionContentBox>
                        {
                            // props.statusCards === "loading" ?
                            //     <CircularProgress/>
                            //     :
                                <Box>

                                    <Typography>Question: {props.randomCard.question}</Typography>
                                    <Typography sx={{opacity: 0.5}}>number of
                                        attempts: {props.randomCard.shots}</Typography>
                                </Box>
                        }
                        <LightStyledButton onClick={handleOpen} variant='contained'>show answer</LightStyledButton>
                    </LearnQuestionContentBox>
                </QuestionBoxStyled>


                <CustomModal handleClose={handleClose} open={props.open} disabledStyle={true} title={''}>
                    <AnswerBoxStyled>
                        <LearnTitleBox>
                            <Typography variant={"h6"}>{props.packTitle}</Typography>
                        </LearnTitleBox>
                        <LearnQuestionContentBox>
                            <Box>
                                <Typography>Answer: {props.randomCard.answer}</Typography>
                                <Typography sx={{opacity: 0.5}}>number of attempts: {props.randomCard.shots}</Typography>
                                <FormGroup>
                                    {formControlLabelMapped}
                                </FormGroup>
                            </Box>
                            <LightStyledButton onClick={onNext} variant='contained'>Next</LightStyledButton>
                        </LearnQuestionContentBox>
                    </AnswerBoxStyled>
                </CustomModal>
            </Box>

        )
    }
)
const LightStyledButton = styled(Button)`
  border-radius: 50px;
  margin-top: 20px;

`
const LearnTitleBox = styled(Box)`
  grid-area: Title;
  display: flex;
  justify-content: center;
  align-items: center;
`
const LearnQuestionContentBox = styled(Box)`
  grid-area: Content;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 3%;
`
const QuestionBoxStyled = styled(Box)`
  display: grid;
  grid-template-areas:
  "Title"
  "Content";
  grid-auto-rows: 2fr 10fr;
  padding: 1% 1% 0% 1%;
  color: black;
  min-width: 410px;
  min-height: 284px;
  max-width: min-content;
  max-height: min-content;
  margin-top: 60px;
  border-radius: 5px;
  background-color: #f0f0f3;

`
const AnswerBoxStyled = styled(Box)`
  display: grid;
  grid-template-areas:
  "Title"
  "Content";
  grid-auto-rows: 2fr 10fr;
  margin-top: 30px;
  padding: 1% 1% 0% 1%;
  color: black;
  min-width: 440px;
  min-height: 284px;
  max-width: max-content;
  max-height: max-content;
  position: absolute;
  top: 35%;
  left: 49.2%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background-color: #f0f0f3;
  //  box-shadow: -10px -10px 10px #d3d3d6;,
  //- 10 px - 10 px 10 px #fff
`