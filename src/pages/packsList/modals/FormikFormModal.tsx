import {useDispatchApp, useSelectorApp} from "../../../CustomHooks/CustomHooks";
import {useFormik} from "formik";
import {Checkbox, Container, FormControlLabel} from "@mui/material";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {FC} from "react";

type FormikErrorType = {
    namePack?: string
    privatePack?: string
}

type PropsType = {
    handleClose: () => void;
    submit: (values: any) => void
    privatePack: boolean
    namePack: string
}

export type ModalFormikPackType = {
    namePack: string
    privatePack: boolean
}


export const FormikFormModal: FC<PropsType> = ({handleClose, submit, privatePack,namePack}) => {
    const formik = useFormik({
        initialValues: {
            namePack: namePack,
            privatePack: privatePack,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.namePack) {
                errors.namePack = 'Required';
            } else if (values.namePack.length < 1) {
                errors.namePack = 'Min name pack 1 symbols';
            }
            return errors;
        },
        onSubmit: values => {
            submit(values)
            formik.resetForm()
        },
    })


    const disabledButton = (formik.values.namePack && !formik.errors.namePack) ? false : true

    return <div>
        <Container fixed>
            <Grid container justifyContent='center' bgcolor='white' borderRadius={1}>
                <Grid item justifyContent={'center'}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormGroup>
                                <TextField label="Name pack" margin="normal" autoFocus={true}
                                           {...formik.getFieldProps('namePack')}
                                />
                                {formik.touched.namePack && formik.errors.namePack
                                    ? <div style={{color: '#9d1717', fontSize: '14px'}}>{formik.errors.namePack}</div>
                                    : null}
                                <FormControlLabel label='Private pack' style={{color: '#2c2929', fontSize: '14px'}}
                                                  control={
                                                      <Checkbox onChange={formik.handleChange}
                                                                checked={formik.values.privatePack}
                                                                name='privatePack'
                                                      />
                                                  }
                                />

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
