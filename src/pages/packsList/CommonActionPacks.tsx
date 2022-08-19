import * as React from 'react';
import { ReactElement, useState} from 'react';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {CardPacksEntityWithDeckCover} from "../../DAL/API-CardsPack";
import {ModalFormikPackType} from "./modals/FormikFormPackModal";
import {AddAndEditPackModal} from "./modals/AddAndEditPackModal";
import {DeletePackModal} from "./modals/DeletePackModal";

type CommonActionType = {
    row: CardPacksEntityWithDeckCover
    userId: string
    deleteRowHandler: (id: string) => void
    editRowHandler: (id: string, e:ModalFormikPackType) => void
    children?: ReactElement
    childrenTitle?: string
    titlePack: string
}
export const CommonAction = (props: CommonActionType) => {

    const [openModalAdd, setOpenModalAdd] = useState(false)
    const handleOpenModalAdd = (): void => setOpenModalAdd(true)
    const handleCloseModalAdd = (): void => setOpenModalAdd(false)

    const [openModalDelete, setOpenModalDelete] = useState(false)
    const handleOpenModalDelete = (): void => setOpenModalDelete(true)
    const handleCloseModalDelete = (): void => setOpenModalDelete(false)

    const editPack = (payload: ModalFormikPackType) => {
        props.editRowHandler(props.row._id, payload)
    }

    const deletePack = () => {
        props.deleteRowHandler(props.row._id)
    }
    return (
        <div>
            <AddAndEditPackModal callback={editPack} deckCover={props.row.deckCover} handleClose={handleCloseModalAdd} open={openModalAdd}
                                 title={'Edit name pack'} privatePack={props.row.private} namePack={props.row.name}/>
            <DeletePackModal open={openModalDelete} handleClose={handleCloseModalDelete} title={'Deleted pack'}
                             callback={deletePack} titlePack={props.titlePack}/>
            {props.userId === props.row.user_id && <><Tooltip title="Delete pack">
                <span>
               <IconButton
                   onClick={handleOpenModalDelete}>
                    <DeleteIcon fontSize={"small"}/>
                </IconButton>
                </span>
            </Tooltip>
                <Tooltip title="Edit pack">
                 <span>
                <IconButton
                    onClick={handleOpenModalAdd}>
                    <EditIcon fontSize={"small"}/>
                </IconButton>
                 </span>
                </Tooltip></>}
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


