import * as React from 'react';
import {memo, ReactNode, useCallback, useMemo} from 'react';
import {ExtendedCardEntity} from "../../DAL/API-Cards";
import {CommonTable} from "../../common/components/table/CommonTable";
import {useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {getTime} from "../../utils/getTime";
import {IconButton, InputAdornment, Rating} from "@mui/material";
import {thunksCards} from "./CardsReducer";
import {CustomEditSpan} from "../../common/components/table/CustomEditbleSpan";
import {Edit} from "@mui/icons-material";

type Numeric = "inherit" | "right" | "left" | "center" | "justify" | undefined;


export interface HeadCell  {
    numeric:Numeric
    id: keyof ExtendedCardEntity;
    label: string;

}
export type Row={
    optionsCell: Numeric,
    cell: string | number | ReactNode
}

const headCells: HeadCell[] = [
    {
        id: 'question',
        numeric: "center",
        label: 'question',
    },
    {
        id: 'answer',
        numeric: "center",
        label: 'answer',
    },
    {
        id: 'updated',
        numeric: "center",
        label: 'Last Updated',
    },
    {
        id: 'grade',
        numeric: "center",
        label: 'grade',
    },
];


type TableCardsType = {
    cards: ExtendedCardEntity[]
}

export const TableCards: React.FC<TableCardsType> = memo(({cards}) => {

        const dispatch = useDispatchApp()

        const changeGrade = useCallback((_id: string, grade: number | null) => {
            dispatch(thunksCards.updateCard({_id, grade}))
        }, [dispatch])

        const changeQuestion = useCallback((_id: string) => (question: string) => {
            dispatch(thunksCards.updateCard({_id, question}))
        }, [dispatch])

        const changeAnswer = useCallback((_id: string) => (answer: string) => {
            dispatch(thunksCards.updateCard({_id, answer}))
        }, [dispatch])

        const packName = useSelectorApp(state => state.cards.packTitle)

        const rows:Array<Row[]> = useMemo(
            () => (

                cards.map((card: ExtendedCardEntity) =>
                    [
                        {
                            optionsCell: 'center',
                            cell: <CustomEditSpan jsxElement={<IconButton onClick={() => {
                                changeQuestion(card._id)
                            }} size='small'><Edit/></IconButton>} autoFocus fullWidth variant='standard'
                                                  onBlurInput={changeQuestion(card._id)} value={card.question}/>
                        },
                        {
                            optionsCell: "center",
                            cell: <CustomEditSpan jsxElement={<IconButton onClick={() => {
                                changeQuestion(card._id)
                            }} size='small'><Edit/></IconButton>} autoFocus fullWidth variant='standard'
                                                  onBlurInput={changeAnswer(card._id)} value={card.answer}/>
                        },
                        {
                            optionsCell: "center",
                            cell: getTime(card.updated)
                        },
                        {
                            optionsCell: "center",
                            cell: <Rating
                                name="simple-controlled"
                                onChange={(event, value) => {
                                    changeGrade(card._id, value)
                                }} value={card.grade}/>
                        }
                    ]
                )
            ), [cards])

        return (
            <CommonTable rows={rows} headCells={headCells} title={packName}/>
        );
    }
)


