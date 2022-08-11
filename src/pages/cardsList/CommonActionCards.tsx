import * as React from 'react';
import {FC, useState} from 'react';
import {ExtendedCardEntity} from "../../DAL/API-Cards";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {AddAndEditCardModal} from "./modals/AddAndEditCardModal";
import {ModalFormikCardType} from "./modals/FormikFormCardModal";
import {DeleteCardModal} from "./modals/DeleteCardModal";

type CommonActionT = {
    handleDelete: (id: string) => void
    handleEdit: (id: string, question: string, answer: string) => void
    id: string
    disabled: boolean
    card: ExtendedCardEntity
    isMyPack: boolean
}
export const CommonAction: FC<CommonActionT> = ({handleDelete, handleEdit, id, disabled, card, isMyPack}) => {

    const [openModalAdd, setOpenModalAdd] = useState(false)
    const handleOpenModalAdd = (): void => setOpenModalAdd(true)
    const handleCloseModalAdd = (): void => setOpenModalAdd(false)

    const [openModalDelete, setOpenModalDelete] = useState(false)
    const handleOpenModalDelete = (): void => setOpenModalDelete(true)
    const handleCloseModalDelete = (): void => setOpenModalDelete(false)

    const onDelete = () => {
        handleDelete(id)
    }
    const onEdite = (e: ModalFormikCardType) => {
        handleEdit(id, e.question, e.answer)
    }

    return (
        <div>
            <AddAndEditCardModal callback={onEdite} handleClose={handleCloseModalAdd} open={openModalAdd}
                                 title={'Edit name title'} question={card.question} answer={card.answer}/>
            <DeleteCardModal open={openModalDelete} handleClose={handleCloseModalDelete} title={'Deleted card'}
                             callback={onDelete} titleCard={card.question}/>
            {isMyPack && <><Tooltip title="Delete pack">
                <IconButton disabled={disabled} onClick={handleOpenModalDelete}>
                    <DeleteIcon fontSize={"small"}/>
                </IconButton>
            </Tooltip>
                <Tooltip title="Edit pack">
                    <IconButton disabled={disabled} onClick={handleOpenModalAdd}>
                        <EditIcon fontSize={"small"}/>
                    </IconButton>
                </Tooltip></>}
        </div>
    )
}


