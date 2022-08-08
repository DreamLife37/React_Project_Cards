import * as React from 'react';
import {CustomModal} from '../../../common/components/modals/CustomModal';
import {FormikFormModal, ModalFormikPackType} from "./FormikFormModal";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type PropsType = {
    open: boolean;
    handleClose: () => void;
    title: string;
    callback: () => void;
}

export const DeletePackModal: React.FC<PropsType> = ({open, handleClose, callback, title}) => {
    const handleDelete = () => {
        handleClose()
        callback()
    }
    return (
        <CustomModal handleClose={handleClose} open={open}>
            <div>
                {title}
                <div>Do you really want to remove 'titleName'?</div>
                <div>All cards will be deleted.</div>
                <Grid container alignItems={'center'} direction={'row'} justifyContent={'center'}>
                    <Grid item xs={6}>
                        <Button variant={'contained'} color={'primary'} onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant={'contained'} color={'primary'} onClick={handleDelete}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </CustomModal>
    );
}

