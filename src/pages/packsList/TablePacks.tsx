import * as React from 'react';
import {memo, ReactElement, ReactNode, useCallback, useMemo, useState} from 'react';
import {CommonTable, HeadCell, Numeric} from "../../common/components/table/CommonTable";
import {useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {getTime} from "../../utils/getTime";
import {Grid} from "@mui/material";
import {styled} from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {CardPacksEntityWithDeckCover} from "../../DAL/API-CardsPack";
import {thunksPack} from "./PackReducer";
import {actionsCards} from "../cardsList/CardsReducer";
import {Path} from "../Routes";
import {useNavigate} from "react-router-dom";
import TableCell from '@material-ui/core/TableCell';
import {ModalFormikPackType} from "./modals/FormikFormModal";
import {AddAndEditPackModal} from "./modals/AddAndEditPackModal";
import {School} from "@mui/icons-material";
import {DeletePackModal} from "./modals/DeletePackModal";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export type Row = {
    optionsCell: Numeric,
    cell: string | number | ReactNode
}

type TablePacksType = {
    packs: CardPacksEntityWithDeckCover[]
    headCells: HeadCell[]
}

export const TablePacks: React.FC<TablePacksType> = memo(({headCells, packs}) => {
        const userId = useSelectorApp(state => state.auth._id)
        const cardsUserId = useSelectorApp(state => state.cards.cardsData.packUserId)
        const packsTotalCount = useSelectorApp(state => state.packs.packsData.cardPacksTotalCount)
        const pageCount = useSelectorApp(state => state.packs.packsData.pageCount)
        const page = useSelectorApp(state => state.packs.packsData.page)

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
            dispatch(thunksPack.setPageCount(setPageCount))
        }, [dispatch])

        const deletePackHandler = (packId: string) => {
            dispatch(thunksPack.deletePack(packId))
        }

        const editPackHandler = (packId: string, newNamePack: string, privatePack: boolean) => {
            dispatch(thunksPack.updatePack({_id: packId, name: newNamePack, private: privatePack}))
        }


        const rows: Array<Row[]> = useMemo(
            () => (
                packs.map((pack: CardPacksEntityWithDeckCover) => {
                        const moveOnCardList = () => {
                            dispatch(actionsCards.setPackId(pack._id))
                            dispatch(actionsCards.getTitle(pack.name))
                            navigate(Path.cardList)
                        }
                        const moveOnLearnPage = () => {
                            dispatch(actionsCards.setPackId(pack._id))
                            dispatch(actionsCards.getTitle(pack.name))
                            navigate(Path.learn)
                        }
                        return [
                            {
                                optionsCell: 'center',
                                cell: <TableCell>
                                    <span onClick={moveOnCardList}
                                          style={{cursor: 'pointer'}}>{pack.name}</span>
                                    {pack.private && <span style={{paddingLeft: '10px'}}><VisibilityOffIcon fontSize={"small"}/>
                                                    </span>}
                                </TableCell>
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
                                                    children={<IconButton onClick={moveOnLearnPage}><School/></IconButton>}
                                                    childrenTitle='Learn'
                                                    deleteRowHandler={deletePackHandler}
                                                    editRowHandler={editPackHandler} titlePack={pack.name}/>
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
    editRowHandler: (id: string, newNamePack: string, privatePack: boolean) => void
    children?: ReactElement
    childrenTitle?: string
    titlePack: string
}
const CommonAction = (props: CommonActionType) => {

    const [openModalAdd, setOpenModalAdd] = useState(false)
    const handleOpenModalAdd = (): void => setOpenModalAdd(true)
    const handleCloseModalAdd = (): void => setOpenModalAdd(false)

    const [openModalDelete, setOpenModalDelete] = useState(false)
    const handleOpenModalDelete = (): void => setOpenModalDelete(true)
    const handleCloseModalDelete = (): void => setOpenModalDelete(false)

    const editPack = (e: ModalFormikPackType) => {
        props.editRowHandler(props.row._id, e.namePack, e.privatePack)
    }

    const deletePack = () => {
        props.deleteRowHandler(props.row._id)
    }
    return (
        <div>
            <AddAndEditPackModal callback={editPack} handleClose={handleCloseModalAdd} open={openModalAdd}
                                 title={'Edit name pack'} privatePack={props.row.private} namePack={props.row.name}/>
            <DeletePackModal open={openModalDelete} handleClose={handleCloseModalDelete} title={'Deleted pack'}
                             callback={deletePack} titlePack={props.titlePack}/>
            <Tooltip title="Delete pack">
                <span>
                <IconButton
                    disabled={props.userId !== props.row.user_id && true}
                    onClick={handleOpenModalDelete}>
                    <DeleteIcon fontSize={"small"}/>
                </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Edit pack">
                 <span>
                <IconButton
                    onClick={handleOpenModalAdd}
                    disabled={props.userId !== props.row.user_id && true}>
                    <EditIcon fontSize={"small"}/>
                </IconButton>
                 </span>
            </Tooltip>

            {
                props.children &&
                <Tooltip title={props.childrenTitle ? props.childrenTitle : false}>
                 <span>
                {props.children}
                 </span>
                </Tooltip>
            }

        </div>
    )
}


