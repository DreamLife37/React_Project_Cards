import * as React from 'react';
import {CustomModal} from '../../../common/components/modals/CustomModal';
import {FormikFormCardModal, ModalFormikCardType} from "./FormikFormCardModal";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import s from "../../packsList/modals/DeletePackModal.module.css";

type PropsType = {
    open: boolean;
    handleClose: () => void;
    title: string;
    callback: (values: ModalFormikCardType) => void;
    question: string
    answer: string
}

export const AddAndEditCardModal: React.FC<PropsType> = ({
                                                             open,
                                                             handleClose,
                                                             callback,
                                                             title,
                                                             question,
                                                             answer
                                                         }) => {
    const submit = (values: ModalFormikCardType): void => {
        callback(values)
        handleClose()
    }
    return (
        <CustomModal handleClose={handleClose} open={open} title={title}>
            <div>
                <Grid container alignItems={'center'} direction={'row'}
                                           justifyContent={"space-between"}
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
                {<FormikFormCardModal handleClose={handleClose} submit={submit} question={question}
                                      answer={answer}/>}
            </div>
        </CustomModal>
    );
}

