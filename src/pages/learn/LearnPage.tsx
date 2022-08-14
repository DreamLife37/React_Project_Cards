import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {useDispatchApp, useSelectorApp} from "../../customHooks/CustomHooks";
import {actionsCards, thunksCards} from "../cardsList/CardsReducer";
import {ExtendedCardEntity} from "../../DAL/API-Cards";
import {Learn} from "./Learn";
import {useNavigate} from "react-router-dom";
import {Path} from "../Routes";
import {NavigateIfNotAuthorised} from "../../common/HOC/NavigateIfNotAuthorised";


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


export const LearnPage = NavigateIfNotAuthorised( () => {

    const cardsData = useSelectorApp(state => state.cards.cardsData)
    const cards = useSelectorApp(state => state.cards.cardsData.cards)
    const packTitle = useSelectorApp(state => state.cards.packTitle)
    const statusCards = useSelectorApp(state => state.cards.statusCards)


    //выбранная оценка
    const [currentGrade, setCurrentGrade] = useState('');
    const [open, setOpen] = useState(false)
    const [randomCard, setRandomCard] = useState<ExtendedCardEntity>({} as ExtendedCardEntity)

    const dispatch = useDispatchApp()
    const navigate=useNavigate()

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

    if(cards&&cards.length===0){navigate(Path.packsList)}

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
})


