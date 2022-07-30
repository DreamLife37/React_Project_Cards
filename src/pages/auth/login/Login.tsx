import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import React from "react";
import {Navigate, NavLink} from "react-router-dom";
import {thunkAuth} from "../auth-reducer";
import {Path} from "../../Routes";
import {useDispatchApp, useSelectorApp} from "../../../CustomHooks/CustomHooks";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

    const isAuthorized = useSelectorApp((state) => state.auth.isAuthorized)
    const status = useSelectorApp(state => state.app.status)
    const dispatch = useDispatchApp()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 8) {
                errors.password = 'min length 8 symbols'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(thunkAuth.login(values))

            formik.resetForm()
        },
    })

    const disabledButton = (formik.values.email && formik.values.password.length > 7 && formik.values.password.length > 7 && !formik.errors.password && !formik.errors.email) ? false : true


    if (isAuthorized) {
        return <Navigate to={Path.profile}/>
    }
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
                            {formik.errors.email && formik.touched.email
                                ? <div style={{color: '#9d1717', fontSize: '14px'}}>{formik.errors.email}</div>
                                : null}
                            <TextField type='password'
                                       label='Password'
                                       margin='normal'
                                       {...formik.getFieldProps('password')}
                                       onBlur={formik.handleBlur}
                            />
                            {formik.errors.password && formik.touched.password
                                ? <div style={{color: '#9d1717', fontSize: '14px'}}>{formik.errors.password}</div>
                                : null}
                            <FormControlLabel label='Remember me' style={{color: '#2c2929', fontSize: '14px'}}

                                              control={
                                                  <Checkbox onChange={formik.handleChange}
                                                            checked={formik.values.rememberMe}
                                                            name='rememberMe'
                                                  />
                                              }
                            />
                            <FormLabel>
                                <p style={{fontSize: '14px'}}>
                                    <NavLink to={Path.restorePassword}>Restore password </NavLink>
                                </p>
                            </FormLabel>

                            <Button disabled={status === 'loading' || disabledButton} type='submit' variant='contained'
                                    color='primary'>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}