import * as React from 'react';
import {CustomModal} from '../../../common/components/modals/CustomModal';
import {FormikFormPackModal, ModalFormikPackType} from "./FormikFormPackModal";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import s from "./DeletePackModal.module.css";

type PropsType = {
    open: boolean;
    handleClose: () => void;
    title: string;
    callback: (values: ModalFormikPackType) => void;
    privatePack: boolean
    namePack: string
    deckCover:string|null
}

export const AddAndEditPackModal: React.FC<PropsType> = ({
                                                             open,
                                                             deckCover,
                                                             handleClose,
                                                             callback,
                                                             title,
                                                             privatePack,
                                                             namePack
                                                         }) => {
    const submit = (values: ModalFormikPackType): void => {
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
                <p className={s.horizontalLine}/>

                <FormikFormPackModal deckCover={deckCover}  handleClose={handleClose} submit={submit} privatePack={privatePack} namePack={namePack}/>
            </div>
        </CustomModal>
    );
}

