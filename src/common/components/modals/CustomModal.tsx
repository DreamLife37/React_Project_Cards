import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {FC, ReactElement} from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import s from "../../../pages/packsList/modals/DeletePackModal.module.css";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 2,
};

type PropsType = {
    children: ReactElement
    handleClose: () => void
    open: boolean
    disabledStyle?: boolean
    title: string
}

export const CustomModal: FC<PropsType> = ({children, handleClose, open, title, disabledStyle}) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={disabledStyle ? undefined : style}>

                    {children}
                </Box>
            </Modal>
        </div>
    );
}
