import * as React from 'react';
import {CustomModal} from '../../../common/components/modals/CustomModal';
import {FormikFormCardModal, ModalFormikCardType} from "./FormikFormCardModal";

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
                {<FormikFormCardModal handleClose={handleClose} submit={submit} question={question}
                                      answer={answer}/>}
            </div>
        </CustomModal>
    );
}

