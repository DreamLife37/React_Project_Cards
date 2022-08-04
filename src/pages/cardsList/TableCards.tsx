import * as React from 'react';
import {memo, ReactNode, useCallback, useEffect, useMemo, useState} from 'react';
import {ExtendedCardEntity} from "../../DAL/API-Cards";
import {CommonTable} from "../../common/components/table/CommonTable";
import {useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {getTime} from "../../utils/getTime";
import {Box, Container, Grid, Rating} from "@mui/material";
import {thunksCards} from "./CardsReducer";
import {CustomEditSpan} from "../../common/components/table/CustomEditbleSpan";
import {EnhancedTableToolbar} from "../../common/components/table/EnhancedTableToolbar";
import {styled} from "@mui/material/styles";


type Numeric = "inherit" | "right" | "left" | "center" | "justify" | undefined;

export interface HeadCell {
    numeric: Numeric
    id: keyof ExtendedCardEntity;
    label: string;
    order: "0" | "1"

}

export type Row = {
    optionsCell: Numeric,
    cell: string | number | ReactNode
}

type TableCardsType = {
    cards: ExtendedCardEntity[]
    headCells: HeadCell[]
}

export const TableCards: React.FC<TableCardsType> = memo(({headCells, cards}) => {

        const cardsPack_id=useSelectorApp(state => state.cards.queryParams.cardsPack_id)

        const dispatch = useDispatchApp()

        const sortHandler = (headCell: HeadCell) => {
            console.log(headCell)
            dispatch(thunksCards.sortCards({...headCell, order: headCell.order === "0" ? "1" : "0"}))
        }

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

        const rows: Array<Row[]> = useMemo(
            () => (

                cards.map((card: ExtendedCardEntity) =>
                    [
                        {
                            optionsCell: 'center',
                            cell: <CustomEditSpan autoFocus fullWidth variant='standard'
                                                  onBlurInput={changeQuestion(card._id)} value={card.question}/>
                        },
                        {
                            optionsCell: "center",
                            cell: <CustomEditSpan autoFocus fullWidth variant='standard'
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

            <BoxCardPages container>
                <EnhancedTableToolbar title={packName} cardsPack_id={cardsPack_id}/>
                <CommonTable sortHandler={sortHandler} rows={rows} headCells={headCells}/>
            </BoxCardPages>

        );
    }
)

const BoxCardPages = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding:  2% 7% 2% 7% ;
;

`


