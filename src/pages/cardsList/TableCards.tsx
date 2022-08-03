import * as React from 'react';
import {memo, useMemo} from 'react';
import {ExtendedCardEntity} from "../../DAL/API-Cards";
import {CommonTable} from "../../common/components/table/CommonTable";
import {useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {getTime} from "../../utils/getTime";
import {Rating} from "@mui/material";
import {thunksCards} from "./CardsReducer";
import {CustomEditSpan} from "../../common/components/table/CustomEditbleSpan";


export interface HeadCell {
    id: keyof ExtendedCardEntity;
    numeric: "inherit" | "right" | "left" | "center" | "justify" | undefined;
    label: string;

}

const headCells: HeadCell[] = [
    {
        id: 'question',
        numeric: "center",
        label: 'question',
    },
    {
        id: 'answer',
        numeric: "right",
        label: 'answer',
    },
    {
        id: 'updated',
        numeric: "right",
        label: 'Last Updated',
    },
    {
        id: 'grade',
        numeric: "right",
        label: 'grade',
    },
];


type TableCardsType = {
    cards: ExtendedCardEntity[]
}

export const TableCards: React.FC<TableCardsType> = memo(({cards}) => {

    const dispatch=useDispatchApp()

    const changeGrade = (_id:string,grade:number|null) => {
      dispatch(thunksCards.updateCard({_id,grade}))
    }

    const changeQuestion = (_id:string ) =>(question:string)=> {
        dispatch(thunksCards.updateCard({_id,question}))
    }

    const changeAnswer = (_id:string) => (answer:string)=>{
            dispatch(thunksCards.updateCard({_id,answer}))
    }


    const packName = useSelectorApp(state => state.cards.packTitle)

    const rows = useMemo(
            () => cards?.map((card: ExtendedCardEntity) =>
                [
                    <CustomEditSpan onBlurInput={changeQuestion(card._id)}  value={card.question}/>,
                    <CustomEditSpan onBlurInput={changeAnswer(card._id)}  value={card.answer}/>,
                    getTime(card.updated),
                    <Rating
                        name="simple-controlled"
                        onChange={(event, value)=> {
                        changeGrade(card._id,value)
                    }} value={card.grade}/>
                ]
            ), [cards])

        return (
            <CommonTable rows={rows} headCells={headCells} title={packName}/>
        );
    }
)


