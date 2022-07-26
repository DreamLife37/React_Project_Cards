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


type FormikErrorType = {
    email?: string
    password?: string
}

export const RegistrationPage = () => {

    const dispatch = useDispatch()
    const isRegistration = useSelector((state: AppStoreType) => state.auth.isRegistration)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
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
                                    ? <div style={{color: 'red'}}>{formik.errors.email}</div>
                                    : null}
                                <TextField type="password" label="Password"
                                           margin="normal"
                                           {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password && formik.errors.password
                                    ? <div style={{color: 'red'}}>{formik.errors.password}</div>
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