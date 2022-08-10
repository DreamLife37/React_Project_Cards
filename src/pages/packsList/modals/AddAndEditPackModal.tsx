import * as React from 'react';
import {CustomModal} from '../../../common/components/modals/CustomModal';
import {FormikFormPackModal, ModalFormikPackType} from "./FormikFormPackModal";

type PropsType = {
    open: boolean;
    handleClose: () => void;
    title: string;
    callback: (values: ModalFormikPackType) => void;
    privatePack: boolean
    namePack: string
}

export const AddAndEditPackModal: React.FC<PropsType> = ({
                                                             open,
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
                {<FormikFormPackModal handleClose={handleClose} submit={submit} privatePack={privatePack} namePack={namePack}/>}
            </div>
        </CustomModal>
    );
}

