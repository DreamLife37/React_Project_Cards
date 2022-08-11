import * as React from 'react';
import {FC, memo, ReactNode, useCallback, useEffect, useMemo} from 'react';
import {ExtendedCardEntity} from "../../DAL/API-Cards";
import {CommonTable, HeadCell, Numeric} from "../../common/components/table/CommonTable";
import {useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {getTime} from "../../utils/getTime";
import {Grid, LinearProgress, Rating} from "@mui/material";
import {actionsCards, thunksCards} from "./CardsReducer";
import {CustomEditSpan} from "../../common/components/table/CustomEditbleSpan";
import {CardsTableToolbar} from "./CardsTableToolbar";
import {styled} from "@mui/material/styles";
import {CommonAction} from "./CommonActionCards";

export type Row = {
    optionsCell: Numeric,
    cell: string | number | ReactNode
}

export const CardsPage: FC = memo(() => {

        const cardsPack_id = useSelectorApp(state => state.cards.cardsPack_id)
        const userId = useSelectorApp(state => state.auth._id)
        const cardsUserId = useSelectorApp(state => state.cards.cardsData.packUserId)
        const cardsTotalCount = useSelectorApp(state => state.cards.cardsData.cardsTotalCount)
        const pageCount = useSelectorApp(state => state.cards.cardsData.pageCount)
        const page = useSelectorApp(state => state.cards.cardsData.page - 1)
        const packName = useSelectorApp(state => state.cards.packTitle)
        const statusCards = useSelectorApp(state => state.cards.statusCards)
        const cards = useSelectorApp(state => state.cards.cardsData.cards || [])
        const headCells = useSelectorApp(state => state.cards.initHeadCells)
        const requestPendingList = useSelectorApp(state => state.cards.requestPendingList)


        useEffect(() => {
            dispatch(thunksCards.getCards())
            return () => {
                dispatch(actionsCards.getCards({}))
                dispatch(actionsCards.setQueryParams({}))
            }
        }, [])

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

        const deleteCard = (id: string) => {
            dispatch(thunksCards.deleteCard(id))
        }
        const editCard = (_id: string, newQuestion: string, newAnswer: string) => {
            dispatch(thunksCards.updateCard({_id, question: newQuestion, answer: newAnswer}))
        }

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
                                readOnly
                                value={card.grade}/>
                        },
                        {
                            optionsCell: "center",
                            cell: <CommonAction handleDelete={deleteCard}
                                                handleEdit={editCard}
                                                disabled={requestPendingList[card._id]}
                                                id={card._id}
                                                card={card}
                                                isMyPack={isMyPack}
                            />
                        }
                    ]
                )
            ), [cards, statusCards])

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
                    headCells={headCells}
                />
                {statusCards === "loading" && <LinearProgress/>}
            </BoxCardPages>
        );
    }
)

const BoxCardPages = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 2% 7% 2% 7%;
`
