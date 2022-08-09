import * as React from 'react';
import {CustomModal} from '../../../common/components/modals/CustomModal';
import {FormikFormModal, ModalFormikPackType} from "./FormikFormModal";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import s from "./DeletePackModal.module.css";

type PropsType = {
    open: boolean;
    handleClose: () => void;
    title: string;
    callback: (values: ModalFormikPackType) => void;
}

export const AddAndEditPackModal: React.FC<PropsType> = ({open, handleClose, callback, title}) => {
    const submit = (values: ModalFormikPackType): void => {
        callback(values)
        handleClose()
    }
    return (
        <CustomModal handleClose={handleClose} open={open} title={title}>
            <div>
                {<FormikFormModal handleClose={handleClose} submit={submit}/>}
            </div>
        </CustomModal>
    );
}

