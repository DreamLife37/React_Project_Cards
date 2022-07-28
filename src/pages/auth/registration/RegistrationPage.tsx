import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import {useFormik} from "formik";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {registration} from "../auth-reducer";
import {AppStoreType} from "../../app/store";
import FormGroup from "@mui/material/FormGroup";
import {Container} from "@mui/material";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {useState} from "react";

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const RegistrationPage = () => {

    const dispatch = useDispatch()
    const isRegistration = useSelector((state: AppStoreType) => state.auth.isRegistration)
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
            // @ts-ignore
            dispatch(registration(values))
            formik.resetForm()
        },
    })

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

                                <Button type={'submit'} variant={'contained'} color={'primary'}>
                                    Sign Up
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Grid>
            </Grid>
        </Container>
    </div>
}