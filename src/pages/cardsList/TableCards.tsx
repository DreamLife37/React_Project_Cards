import * as React from 'react';
import {memo, ReactNode, useCallback, useEffect, useMemo, useState} from 'react';
import {ExtendedCardEntity} from "../../DAL/API-Cards";
import {CommonTable} from "../../common/components/table/CommonTable";
import {useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {getTime} from "../../utils/getTime";
import {Box, Container, Grid, Rating} from "@mui/material";
import {thunksCards} from "./CardsReducer";
import {CustomEditSpan} from "../../common/components/table/CustomEditbleSpan";
import {CardsTableToolbar} from "../../common/components/table/CardsTableToolbar";
import {styled} from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";


type Numeric = "inherit" | "right" | "left" | "center" | "justify" | undefined;

export interface HeadCell {
    numeric: Numeric
    id: keyof ExtendedCardEntity|"action";
    label: string;
    order: "0" | "1"|undefined

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

        const cardsPack_id = useSelectorApp(state => state.cards.queryParams.cardsPack_id)
        const userId = useSelectorApp(state => state.auth._id)
        const cardsUserId = useSelectorApp(state => state.cards.cards.packUserId)
        const cardsTotalCount = useSelectorApp(state => state.cards.cards.cardsTotalCount)
        const pageCount = useSelectorApp(state => state.cards.cards.pageCount)
        const page = useSelectorApp(state => state.cards.cards.page)
        const packName = useSelectorApp(state => state.cards.packTitle)

        const dispatch = useDispatchApp()

        const isMyPack = cardsUserId === userId

        const sortHandler = useCallback((headCell: HeadCell) => {
            dispatch(thunksCards.sortCards({...headCell, order: headCell.order === "0" ? "1" : "0"}))
        }, [dispatch])

        const changeGrade = useCallback((_id: string, grade: number | null) => {
            isMyPack && dispatch(thunksCards.updateCard({_id, grade}))
        }, [dispatch, isMyPack])

        const changeQuestion = useCallback((_id: string) => (question: string) => {
            isMyPack && dispatch(thunksCards.updateCard({_id, question}))
        }, [dispatch, isMyPack])

        const changeAnswer = useCallback((_id: string) => (answer: string) => {
            isMyPack && dispatch(thunksCards.updateCard({_id, answer}))
        }, [dispatch, isMyPack])

        const onPageChangeHandler = useCallback((page: number) => {
            dispatch(thunksCards.setPage(page))
        }, [dispatch])

        const onRowsPerPageChangeHandler = useCallback((setPageCount: number) => {
            dispatch(thunksCards.setPageCount(setPageCount))
        }, [dispatch])


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
                        },
                        {
                            optionsCell: "center",
                            cell: <CommonAction/>
                        }
                    ]
                )
            ), [cards])

        return (

            <BoxCardPages container>
                <CardsTableToolbar isMyPack={isMyPack} title={packName} cardsPack_id={cardsPack_id}/>
                <CommonTable
                    onPageChangeHandler={onPageChangeHandler}
                    onRowsPerPageChangeHandler={onRowsPerPageChangeHandler}
                    cardsTotalCount={cardsTotalCount}
                    pageCount={pageCount}
                    page={page}
                    sortHandler={sortHandler}
                    rows={rows}
                    headCells={headCells}/>
            </BoxCardPages>

        );
    }
)

const BoxCardPages = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 2% 7% 2% 7%;;
`
const CommonAction = () => {
  return(
      <div>
          <Tooltip title="Delete pack">
              <IconButton >
                  <DeleteIcon fontSize={"small"}/>
              </IconButton></Tooltip>
          <Tooltip title="Edit pack">
              <IconButton
                  >
                  <EditIcon fontSize={"small"}/>
              </IconButton></Tooltip>
      </div>
  )
}


