import * as React from 'react';
import {CustomModal} from '../../../common/components/modals/CustomModal';
import {FormikFormModal, ModalFormikPackType} from "./FormikFormModal";

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
    callback: (values: ModalFormikPackType) => void;
}

export const AddAndEditPackModal: React.FC<PropsType> = ({open, handleClose, callback, title}) => {
    const submit = (values: ModalFormikPackType): void => {
        callback(values)
        handleClose()
    }
    return (
        <CustomModal handleClose={handleClose} open={open}>
            <div>
                {title}
                {<FormikFormModal handleClose={handleClose} submit={submit}/>}
            </div>
        </CustomModal>
    );
}

