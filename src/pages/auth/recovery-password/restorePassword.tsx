import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import React from "react";
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import {thunkAuth} from "../auth-reducer";
import {Path} from "../../Routes";
import {useDispatchApp, useSelectorApp} from "../../../CustomHooks/CustomHooks";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const RestorePassword = () => {

    const isAuthorized = useSelectorApp((state) => state.auth.isAuthorized)
    const dispatch = useDispatchApp()
    const navigate=useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(thunkAuth.fetchRecoveryPassMail(values.email))
            navigate(Path.redirectAfterSendRecoveryPassEmail)
            formik.resetForm()

        },
    })


    return (
        <Grid container justifyContent='center' bgcolor='white' padding={1} borderRadius={1} m={1}>
            <Grid item justifyContent='center'>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
                            <TextField label='Email'

                                       margin='normal'
                                       {...formik.getFieldProps('email')}
                                       onBlur={formik.handleBlur}

                            />
                            {formik.errors.email && formik.touched.email ?
                                <div style={{color: 'red'}}>{formik.errors.email}</div> : null}

                                <Button type='submit' variant='contained' color='primary'>
                                        Send email
                                </Button>

                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}