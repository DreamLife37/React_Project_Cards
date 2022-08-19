import {useFormik} from "formik";
import {Checkbox, Container, FormControlLabel} from "@mui/material";
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
    name?: string
    privatePack?: string
    file?: string
}

type PropsType = {
    handleClose: () => void;
    submit: (values: ModalFormikPackType) => void
    privatePack: boolean
    name: string
    deckCover: string | null
}

export type ModalFormikPackType = {
    name: string
    deckCover: string
    privatePack: boolean
}


export const FormikFormPackModal: FC<PropsType> = ({deckCover, handleClose, submit, privatePack, name}) => {

    const [currentDeckCover, setCurrentDeckCover] = useState(!!deckCover ? deckCover : "")

    const formik = useFormik({
        initialValues: {
            name: name,
            privatePack: privatePack,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.name) {
                errors.name = 'Required';
            } else if (values.name.length < 1) {
                errors.name = 'Min name pack 1 symbols';
            }
            return errors;
        },
        onSubmit: values => {
            submit({...values, deckCover: currentDeckCover})
            formik.resetForm()
        },
    })
    const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
        uploadFile(e, setCurrentDeckCover)
    }

    const disabledButton = (!(formik.values.name && !formik.errors.name))

    return <div>
        <Container fixed>
            <Grid container justifyContent='center' bgcolor='white' borderRadius={1}>
                <Grid item justifyContent={'center'}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormGroup>
                                <FormControlLabel
                                    sx={{marginLeft: 0, color: "blue", textDecoration: "underline", cursor: "pointer"}}
                                    label={"change deck cover"}
                                    control={
                                        <input type="file"
                                               style={{display: 'none'}}
                                               onChange={onUpload}
                                        />
                                    }/>
                                <MediaCard height={"100"} content={currentDeckCover}/>
                                <TextField label="Name pack" margin="normal" autoFocus={true}
                                           {...formik.getFieldProps('name')}
                                />
                                {formik.touched.name && formik.errors.name
                                    ? <div style={{color: '#9d1717', fontSize: '14px'}}>{formik.errors.name}</div>
                                    : null}
                                <FormControlLabel label='Private pack' style={{color: '#2c2929', fontSize: '14px'}}
                                                  control={
                                                      <Checkbox onChange={formik.handleChange}
                                                                checked={formik.values.privatePack}
                                                                name='privatePack'
                                                      />
                                                  }
                                />

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

