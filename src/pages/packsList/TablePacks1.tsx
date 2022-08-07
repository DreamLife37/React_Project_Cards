import * as React from 'react';
import {memo, ReactNode, useCallback, useEffect, useMemo, useState} from 'react';
import {ExtendedCardEntity} from "../../DAL/API-Cards";
import {CommonTable} from "../../common/components/table/CommonTable";
import {useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {getTime} from "../../utils/getTime";
import {Box, Container, Grid, Rating} from "@mui/material";
import {CustomEditSpan} from "../../common/components/table/CustomEditbleSpan";
import {CardsTableToolbar} from "../../common/components/table/CardsTableToolbar";
import {styled} from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {CardPacksEntityWithDeckCover} from "../../DAL/API-CardsPack";
import {HeadCell, thunksPack} from "./PackReducer";
import {actionsCards, thunksCards} from "../cardsList/CardsReducer";
import {Path} from "../Routes";
import {useNavigate} from "react-router-dom";
import TableCell from '@material-ui/core/TableCell';


//type Numeric = "inherit" | "right" | "left" | "center" | "justify" | undefined;


// export interface HeadCell {
//     numeric: Numeric
//     id: keyof CardPacksEntityWithDeckCover|"action";
//     label: string;
//     order: "0" | "1"|undefined
// }

export type Row = {
    optionsCell: "inherit" | "right" | "left" | "center" | "justify" | undefined,
    cell: string | number | ReactNode
}

type TablePacksType = {
    packs: CardPacksEntityWithDeckCover[]
    headCells: HeadCell[]
}

export const TablePacks1: React.FC<TablePacksType> = memo(({headCells, packs}) => {

        const cardsPack_id = useSelectorApp(state => state.cards.queryParams.cardsPack_id)
        const userId = useSelectorApp(state => state.auth._id)
        const cardsUserId = useSelectorApp(state => state.cards.cards.packUserId)
        const packsTotalCount = useSelectorApp(state => state.packs.packsData.cardPacksTotalCount)
        const pageCount = useSelectorApp(state => state.packs.packsData.pageCount)
        const page = useSelectorApp(state => state.packs.packsData.page)
        const packName = useSelectorApp(state => state.cards.packTitle)

        const dispatch = useDispatchApp()
        const navigate = useNavigate()

        const isMyPack = cardsUserId === userId

        const sortHandler = useCallback((headCell: HeadCell) => {
            dispatch(thunksPack.sortPack({...headCell, order: headCell.order === "0" ? "1" : "0"}))

        }, [dispatch])

        const onPageChangeHandler = useCallback((page: number) => {
            dispatch(thunksPack.setPage(page))
        }, [dispatch])

        const onRowsPerPageChangeHandler = useCallback((setPageCount: number) => {
            //dispatch(thunksPack.setPageCount(setPageCount))
            dispatch(thunksPack.setPageCount(setPageCount))

        }, [dispatch])

        const deletePackHandler = (packId: string) => {
            dispatch(thunksPack.deletePack(packId))
        }

        const editPackHandler = (packId: string, namePack: string) => {
            dispatch(thunksPack.updatePack({_id: packId, name: namePack}))
        }

        const rows: Array<Row[]> = useMemo(
            () => (
                packs.map((pack: CardPacksEntityWithDeckCover) => {
                        const moveOnCardList = () => {
                            dispatch(actionsCards.setQueryParams({cardsPack_id: pack._id}))
                            dispatch(actionsCards.getTitle(pack.name))
                            navigate(Path.cardList)
                        }
                        return [
                            {
                                optionsCell: 'center',
                                cell: <TableCell onClick={moveOnCardList}>{pack.name} </TableCell>
                            },
                            {
                                optionsCell: "center",
                                cell: <TableCell>{String(pack.cardsCount)}</TableCell>
                            },
                            {
                                optionsCell: "center",
                                cell: getTime(pack.updated)
                            },
                            {
                                optionsCell: "center",
                                cell: getTime(pack.created)
                            },
                            {
                                optionsCell: "center",
                                cell: <CommonAction row={pack} userId={userId}
                                                    deleteRowHandler={deletePackHandler}
                                                    editRowHandler={editPackHandler}/>
                            }
                        ]
                    }
                )
            ), [packs])

        return (

            <BoxCardPages container>
                <CommonTable
                    onPageChangeHandler={onPageChangeHandler}
                    onRowsPerPageChangeHandler={onRowsPerPageChangeHandler}
                    cardsTotalCount={packsTotalCount}
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

type CommonActionType = {
    row: CardPacksEntityWithDeckCover
    userId: string
    deleteRowHandler: (id: string) => void
    editRowHandler: (id: string, newTitle: string) => void
}
const CommonAction = (props: CommonActionType) => {

    return (
        <div>
            <Tooltip title="Delete pack">
                <IconButton
                    disabled={props.userId !== props.row.user_id && true}
                    onClick={() => props.deleteRowHandler(props.row._id)}>
                    <DeleteIcon fontSize={"small"}/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit pack">

                <IconButton
                    onClick={() => props.editRowHandler(props.row._id, 'IT-INCUBATOR лучшие!')}
                    disabled={props.userId !== props.row.user_id && true}>
                    <EditIcon fontSize={"small"}/>
                </IconButton>

            </Tooltip>
        </div>
    )
}


