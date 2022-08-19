import {useFormik} from "formik";
import {Container, FormControlLabel} from "@mui/material";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {ChangeEvent, FC, useState} from "react";
import {MediaCard} from "../../../common/components/ImageCard/MediaCard";
import {uploadFile} from "../../../common/utils/uploadFile";

type FormikErrorType = {
    question?: string
    answer?: string
}

type PropsType = {
    handleClose: () => void;
    submit: (values: any) => void
    question: string
    answer: string
    answerImg: string
    questionImg: string
}

export type ModalFormikCardType = {
    question: string
    answer: string
    answerImg: string
    questionImg: string
    typeQuestion?: string
}


export const FormikFormCardModal: FC<PropsType> = ({handleClose, submit, question, answer, questionImg, answerImg}) => {
    const [currentImgQuestion, setCurrentImgQuestion] = useState(!!questionImg ? questionImg : "")
    const [currentImgAnswer, setCurrentImgAnswer] = useState(!!answerImg ? answerImg : "")

    const formik = useFormik({
        initialValues: {
            typeQuestion: '',
            question: question,
            answer: answer,
        },
        validate: (values) => {
            debugger
            const errors: FormikErrorType = {};
            if (!values.question && !currentImgQuestion) {
                errors.question = 'Required';
            } else if (!values.answer && !currentImgAnswer) {
                errors.answer = 'Required';
            }
            return errors;
        },

        onSubmit: values => {
            submit({...values, questionImg: currentImgQuestion, answerImg: currentImgAnswer})
            formik.resetForm()
        },
    })

    const onAnswerUpload = (e: ChangeEvent<HTMLInputElement>) => {
        uploadFile(e, setCurrentImgAnswer)
    }
    const onQuestionUpload = (e: ChangeEvent<HTMLInputElement>) => {
        uploadFile(e, setCurrentImgQuestion)
    }

    const disabledButton = false
    //(!(formik.values.question && formik.values.answer &&        formik.values.question && formik.values.answer))

    return <div>
        <Container fixed>
            <Grid container justifyContent='center' bgcolor='white' borderRadius={1}>
                <Grid item justifyContent={'space-around'}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormGroup>
                                <FormControlLabel
                                    sx={{marginLeft: 0, color: "blue", textDecoration: "underline", cursor: "pointer"}}
                                    label={"change question img"}
                                    control={
                                        <input type="file"
                                               style={{display: 'none'}}
                                               onChange={onQuestionUpload}
                                        />
                                    }/>
                                <MediaCard height={"100"} content={currentImgQuestion}/>

                                <TextField label="Question" margin="normal"
                                           {...formik.getFieldProps('question')}
                                />
                                {formik.touched.question && formik.errors.question
                                    ? <div style={{color: '#9d1717', fontSize: '14px'}}>{formik.errors.question}</div>
                                    : null}
                                <FormControlLabel
                                    sx={{marginLeft: 0, color: "blue", textDecoration: "underline", cursor: "pointer"}}
                                    label={"change answer img"}
                                    control={
                                        <input type="file"
                                               style={{display: 'none'}}
                                               onChange={onAnswerUpload}
                                        />
                                    }/>
                                <MediaCard height={"100"} content={currentImgAnswer}/>
                                <TextField label="Answer" margin="normal"
                                           {...formik.getFieldProps('answer')}
                                />
                                {formik.touched.answer && formik.errors.answer
                                    ? <div style={{color: '#9d1717', fontSize: '14px'}}>{formik.errors.answer}</div>
                                    : null}
                                <Grid container
                                      justifyContent={"space-between"} direction="row">
                                    <Grid item>
                                        <Button variant={'contained'} color={'primary'} onClick={handleClose}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid item marginLeft={'50px'}>
                                        <Button type={'submit'} variant={'contained'} color={"success"}
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
