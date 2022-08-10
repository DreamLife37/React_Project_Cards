import {useDispatchApp, useSelectorApp} from "../../../CustomHooks/CustomHooks";
import {useFormik} from "formik";
import {Container} from "@mui/material";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {FC} from "react";

type FormikErrorType = {
    question?: string
    answer?: string
}

type PropsType = {
    handleClose: () => void;
    submit: (values: any) => void
    question: string
    answer: string
}

export type ModalFormikCardType = {
    question: string
    answer: string
    typeQuestion?: string
}


export const FormikFormCardModal: FC<PropsType> = ({handleClose, submit, question, answer}) => {
    const formik = useFormik({
        initialValues: {
            typeQuestion: '',
            question: question,
            answer: answer,

        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.question) {
                errors.question = 'Required';
            } else if (!values.answer) {
                errors.answer = 'Required';
            }
            return errors;
        },
        onSubmit: values => {
            submit(values)
            formik.resetForm()
        },
    })

    const disabledButton = (!(!formik.errors.question && !formik.errors.answer &&
        formik.values.question && formik.values.answer))

    return <div>
        <Container fixed>
            <Grid container justifyContent='center' bgcolor='white' borderRadius={1}>
                <Grid item justifyContent={'space-between'}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormGroup>
                                <TextField label="Question" margin="normal" autoFocus={true}
                                           {...formik.getFieldProps('question')}
                                />
                                {formik.touched.question && formik.errors.question
                                    ? <div style={{color: '#9d1717', fontSize: '14px'}}>{formik.errors.question}</div>
                                    : null}
                                <TextField label="Answer" margin="normal"
                                           {...formik.getFieldProps('answer')}
                                />
                                {formik.touched.answer && formik.errors.answer
                                    ? <div style={{color: '#9d1717', fontSize: '14px'}}>{formik.errors.answer}</div>
                                    : null}


                                <Grid container alignItems={'center'} direction={'row'}
                                      justifyContent={"space-between"}>
                                    <Grid item xs={4} paddingLeft={'20px'}>
                                        <Button variant={'contained'} color={'primary'} onClick={handleClose}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button type={'submit'} variant={'contained'} color={'primary'}
                                                disabled={disabledButton}>
                                            Save
                                        </Button>
                                    </Grid>
                                </Grid>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Grid>
            </Grid>
        </Container>
    </div>
}
