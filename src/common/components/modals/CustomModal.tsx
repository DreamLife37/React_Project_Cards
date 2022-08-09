import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
    disabledStyle?:boolean
    title: string

}

export const CustomModal: FC<PropsType> = ({disabledStyle,children, handleClose, open}) => {
export const CustomModal: FC<PropsType> = ({children, handleClose, open, title}) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={disabledStyle?undefined:style}>
                <Box sx={style}>
                    <Grid container alignItems={'center'} direction={'row'} justifyContent={"space-between"}
                          paddingBottom={'15px'}>
                        <Grid item xs={6} fontSize={'20px'}>
                            {title}
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton onClick={handleClose}>
                                <CloseIcon fontSize={"small"}/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <p className={s.horizontalLine}></p>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}
