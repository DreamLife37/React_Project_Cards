import * as React from 'react';
import {CustomModal} from '../../../common/components/modals/CustomModal';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import s from './DeleteCardModal.module.css'

type PropsType = {
    open: boolean;
    handleClose: () => void;
    title: string;
    callback: () => void;
    titleCard: string
}

export const DeleteCardModal: React.FC<PropsType> = ({open, handleClose, callback, title, titleCard}) => {
    const handleDelete = () => {
        handleClose()
        callback()
    }
    return (
        <CustomModal handleClose={handleClose} open={open} title={title}>
            <div>
                <div className={s.message}>
                    <div>Do you really want to remove card:
                        <div className={s.titlePack}>{titleCard}?</div></div>
                </div>
                <Grid container alignItems={'center'} direction={'row'} justifyContent={"space-between"}>
                    <Grid item xs={4} paddingLeft={'20px'}>
                        <Button variant={'contained'} color={'primary'} onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant={'contained'} color={"error"} onClick={handleDelete}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </CustomModal>
    )
        ;
}

