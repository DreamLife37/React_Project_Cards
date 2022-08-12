import {Navigate, NavLink} from "react-router-dom";
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import {useFormik} from "formik";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {thunkAuth} from "../auth-reducer";
import FormGroup from "@mui/material/FormGroup";
import {Container} from "@mui/material";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, {useState} from "react";
import {Path} from "../../Routes";
import {useDispatchApp, useSelectorApp} from "../../../customHooks/CustomHooks";

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const RegistrationPage = () => {

    const dispatch = useDispatchApp()
    const isRegistration = useSelectorApp(state => state.auth.isRegistration)
    const [passwordHide, togglePasswordHide] = useState(true)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 8) {
                errors.password = 'Min password 8 symbols';
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
            } else if (values.confirmPassword.length < 8) {
                errors.confirmPassword = 'Min password 8 symbols';
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords does not match'
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(thunkAuth.registration(values))
            isRegistration && formik.resetForm()
        },
    })

    const disabledButton = (formik.values.email && formik.values.password.length > 7 && formik.values.confirmPassword.length > 7 && !formik.errors.confirmPassword && !formik.errors.email) ? false : true

    if (isRegistration) {
        return <Navigate to={'/login'}/>
    }

    return <div>


        <Container fixed>
            <Grid container justifyContent='center' bgcolor='white' padding={1} borderRadius={1} m={1}>
                <Grid item justifyContent={'center'}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormGroup>
                                <TextField label="Email" margin="normal"
                                           {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email
                                    ? <div style={{color: '#9d1717', fontSize: '14px'}}>{formik.errors.email}</div>
                                    : null}
                                <TextField label="Password"
                                           margin="normal"
                                           type={passwordHide ? "password" : "text"}
                                           {...formik.getFieldProps('password')}
                                           InputProps={
                                               {
                                                   endAdornment: (
                                                       <InputAdornment position="end"> {
                                                           passwordHide ? (
                                                               <Visibility className="cursor_pointer"
                                                                           onClick={() =>
                                                                               togglePasswordHide(false)
                                                                           }
                                                               />
                                                           ) : (
                                                               <VisibilityOff onClick={
                                                                   () =>
                                                                       togglePasswordHide(true)
                                                               }
                                                               />
                                                           )
                                                       }
                                                       </InputAdornment>
                                                   ),
                                               }
                                           }
                                />
                                {formik.touched.password && formik.errors.password
                                    ? <div style={{color: '#9d1717', fontSize: '14px'}}>{formik.errors.password}</div>
                                    : null}

                                <TextField label="Confirm Password"
                                           margin="normal"
                                           type={passwordHide ? "password" : "text"}
                                           {...formik.getFieldProps('confirmPassword')}
                                           InputProps={
                                               {
                                                   endAdornment: (
                                                       <InputAdornment position="end"> {
                                                           passwordHide ? (
                                                               <Visibility className="cursor_pointer"
                                                                           onClick={() =>
                                                                               togglePasswordHide(false)
                                                                           }
                                                               />
                                                           ) : (
                                                               <VisibilityOff onClick={
                                                                   () =>
                                                                       togglePasswordHide(true)
                                                               }
                                                               />
                                                           )
                                                       }
                                                       </InputAdornment>
                                                   ),
                                               }
                                           }
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword
                                    ? <div style={{
                                        color: '#9d1717',
                                        fontSize: '14px',
                                        paddingBottom: '5px'
                                    }}>{formik.errors.confirmPassword}</div>
                                    : null}

                                <Button type={'submit'} variant={'contained'} color={'primary'}
                                        disabled={disabledButton}>
                                    Sign Up
                                </Button>

                                <div style={{color: '#2c2929', fontSize: '14px', paddingTop: '15px'}}>Already have an
                                    account?
                                </div>


                                    <p style={{fontSize: '14px'}}>
                                        <NavLink to={Path.login}>Sign In</NavLink>
                                    </p>

                            </FormGroup>
                        </FormControl>
                    </form>
                </Grid>
            </Grid>
        </Container>
    </div>
}