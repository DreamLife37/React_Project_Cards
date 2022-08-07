import {Button, FormControl, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import React from "react";
import {thunkAuth} from "./auth/auth-reducer";
import {useDispatchApp, useSelectorApp} from "../CustomHooks/CustomHooks";


type FormikErrorType = {
    newName?: string
}


export const Settings = () => {
    const statusApp = useSelectorApp(state => state.app.statusApp)
    const dispatch = useDispatchApp()

    const formik = useFormik({
        initialValues: {
            newName: '',
            URL: ''
        },
        validate: () => {
            const errors: FormikErrorType = {}

            return errors
        },
        onSubmit: values => {
            console.log(values)
            if (values.URL.trim() && values.newName.trim()) {
                dispatch(thunkAuth.setNameOrAvatar({avatar: values.URL, name: values.newName}))
                formik.resetForm()
                return
            }
            if (values.newName.trim()) {
                dispatch(thunkAuth.setNameOrAvatar({name: values.newName}))
            }
            if (values.URL.trim()) {
                dispatch(thunkAuth.setNameOrAvatar({avatar: values.URL}))
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
                            <FormLabel>
                                Update name?
                            </FormLabel>

                            <TextField label='new name'
                                       margin='normal'
                                       {...formik.getFieldProps('newName')}
                                       onBlur={formik.handleBlur}

                            />
                            {formik.errors.newName && formik.touched.newName ?
                                <div style={{color: 'red'}}>{formik.errors.newName}</div> : null}
                            <FormLabel>
                                Update avatar?
                            </FormLabel>

                            <TextField label='URL'
                                       margin='normal'
                                       multiline
                                       {...formik.getFieldProps('URL')}
                                       onBlur={formik.handleBlur}
                            />


                            <Button disabled={statusApp==='loading'} type='submit' variant='contained' color='primary'>
                                update profile
                            </Button>

                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}