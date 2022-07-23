import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import React from "react";
import { Navigate } from "react-router-dom";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    // const isAuthorized=useSelectorApp((state)=>state.authReducer.isAuthorized)
    // const dispatch=useDispatchApp()

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
            if(!values.password){
                errors.password='Required'
            } else if (values.password.length<8){
                errors.password='min length 8 symbols'
            }
            return errors
        },
        onSubmit: values => {
            // dispatch(thunkAuth.login(values))
            alert(JSON.stringify(values))
            formik.resetForm()
        },
    })
    // if(isAuthorized){return <Navigate to='/'/>}
    return (
        <Grid container justifyContent='center' bgcolor='white' padding={1} borderRadius={1} m={1}>
            <Grid item justifyContent='center'>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        {/*<FormLabel>*/}
                        {/*    <p>*/}
                        {/*        To log in get registered*/}
                        {/*        <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>*/}
                        {/*            here*/}
                        {/*        </a>*/}
                        {/*    </p>*/}
                        {/*    <p> or use common test account credentials</p>*/}
                        {/*    <p>Email: free@samuraijs.com</p>*/}
                        {/*    <p>Password: free</p>*/}

                        {/*</FormLabel>*/}
                        <FormGroup>
                            <TextField label='Email'

                                       margin='normal'
                                       {...formik.getFieldProps('email')}
                                       onBlur={formik.handleBlur}

                            />
                            {formik.errors.email && formik.touched.email?<div style={{color:'red'}}>{formik.errors.email}</div>:null}
                            <TextField type='password'
                                       label='Password'
                                       margin='normal'
                                       {...formik.getFieldProps('password')}
                                       onBlur={formik.handleBlur}
                            />
                            {formik.errors.password && formik.touched.password?<div style={{color:'red'}}>{formik.errors.password}</div>:null}
                            <FormControlLabel label='Remember me'

                                              control={
                                                  <Checkbox onChange={formik.handleChange}
                                                            checked={formik.values.rememberMe}
                                                            name='rememberMe'
                                                  />
                                              }
                            />
                            <Button type='submit' variant='contained' color='primary'>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}