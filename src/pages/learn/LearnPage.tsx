import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, CircularProgress, FormControlLabel, FormGroup, Grid, LinearProgress} from "@mui/material";
import {CustomModal} from "../../common/components/modals/CustomModal";
import {FC, memo, useCallback, useEffect, useMemo, useState} from "react";
import {useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {actionsCards, thunksCards} from "../cardsList/CardsReducer";
import {ExtendedCardEntity} from "../../DAL/API-Cards";
import Checkbox from '@mui/material/Checkbox';
import * as React from "react";


const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

const getSmartRandomCard = (cards: ExtendedCardEntity[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
        const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
        return {sum: newSum, id: newSum < rand ? i : acc.id}
    }, {sum: 0, id: -1});

    return cards[res.id + 1];
}


export const LearnPage = () => {

    const cardsData = useSelectorApp(state => state.cards.cardsData)
    const cards = useSelectorApp(state => state.cards.cardsData.cards)
    const packTitle = useSelectorApp(state => state.cards.packTitle)
    const statusCards = useSelectorApp(state => state.cards.statusCards)


    //выбранная оценка
    const [currentGrade, setCurrentGrade] = useState('');
    const [open, setOpen] = useState(false)
    const [randomCard, setRandomCard] = useState<ExtendedCardEntity>({} as ExtendedCardEntity)

    const dispatch = useDispatchApp()

    //если в state cardsData пустой объект отправляет запрос
    //при выходе со страницы отчищает cardsData
    useEffect(() => {
        if (Object.keys(cardsData).length === 0) {
            dispatch(thunksCards.getCards())
        }
        return () => {
            dispatch(actionsCards.getCards({}))
        }
    }, [])
    // если массив с картами существует и он не пуст сетает в useState рандомно выбраную карту
    useEffect(() => {
        if (cards && cards.length !== 0) {
            setRandomCard(getSmartRandomCard(cards))
        }
    }, [cards])

    const handleNextCard = useCallback((grade: number) => {
        if (grade === 0) {
            return
        }
        dispatch(thunksCards.updateCardGrade({grade, card_id: randomCard._id}))
        setRandomCard(getSmartRandomCard(cards))
        setOpen(false)
        setCurrentGrade('')
    }, [randomCard, currentGrade, cards])

    return (
        <Learn grades={grades}
               open={open}
               setOpen={setOpen}
               handleNextCard={handleNextCard}
               currentGrade={currentGrade}
               setCurrentGrade={setCurrentGrade}
               randomCard={randomCard}
               statusCards={statusCards}
               packTitle={packTitle}
        />
    )
}

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

        //ковертирует оценку в число
        const gradeNumber = useMemo(() =>
                grades.findIndex((grade) => grade === props.currentGrade) + 1
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
                            props.statusCards === "loading" ?
                                <CircularProgress/>
                                :
                                <Box>

                                    <Typography>Question: {props.randomCard.question}</Typography>
                                    <Typography sx={{opacity: 0.5}}>number of
                                        attempts: {props.randomCard.shots}</Typography>
                                </Box>
                        }
                        <LightStyledButton onClick={handleOpen} variant='contained'>show answer</LightStyledButton>
                    </LearnQuestionContentBox>
                </QuestionBoxStyled>


                <CustomModal handleClose={handleClose} open={props.open} disabledStyle={true}>
                    <AnswerBoxStyled>
                        <LearnTitleBox>
                            <Typography variant={"h6"} >{props.packTitle}</Typography>
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
  margin: 1% 1% 1% 1%;
  padding: 1% 1% 0% 1%;
  color: black;
  min-width: 439px;
  min-height: 284px;
  max-width: min-content;
  max-height: min-content;

  border-radius: 5px;
  background-color: #f0f0f3;

`
const AnswerBoxStyled = styled(Box)`
  display: grid;
  grid-template-areas:
  "Title"
  "Content";
  grid-auto-rows: 2fr 10fr;
  margin: 1% 1% 1% 1%;
  padding: 1% 1% 0% 1%;
  color: black;
  min-width: 439px;
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


