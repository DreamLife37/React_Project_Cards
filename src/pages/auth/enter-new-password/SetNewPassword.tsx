import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import React from "react";
import {Navigate, NavLink, useNavigate, useParams} from "react-router-dom";
import {thunkAuth} from "../auth-reducer";
import {Path} from "../../Routes";
import {useDispatchApp, useSelectorApp} from "../../../CustomHooks/CustomHooks";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const SetNewPassword = () => {
    const params=useParams()
    const navigate=useNavigate()

    const dispatch=useDispatchApp()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {}

            if(!values.password){
                errors.password='Required'
            } else if (values.password.length<8){
                errors.password='min length 8 symbols'
            }
            return errors
        },
        onSubmit: async values => {
            if(params.token){
              const res= await  dispatch(thunkAuth.setPassword({password:values.password,resetPasswordToken:params.token}))
                if(res.statusText==="OK"){
                    navigate(Path.login)
                }
            }
            formik.resetForm()
        },
    })

    return (
        <Grid container justifyContent='center' bgcolor='white' padding={1} borderRadius={1} m={1}>
            <Grid item justifyContent='center'>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
                            <TextField type='password'
                                       label='Password'
                                       margin='normal'
                                       {...formik.getFieldProps('password')}
                                       onBlur={formik.handleBlur}
                            />
                            {formik.errors.password && formik.touched.password?<div style={{color:'red'}}>{formik.errors.password}</div>:null}
                            <Button type='submit' variant='contained' color='primary'>
                                confirm password
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}