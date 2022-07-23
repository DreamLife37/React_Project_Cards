import React, {useEffect} from "react";
import {Snackbar,Alert} from "@mui/material";


type TransitionAlertsType = {
    clearErrorCallback: () => void
    error: string
}
export const TransitionAlerts: React.FC<TransitionAlertsType> = React.memo(({clearErrorCallback, error}) => {
        const [open, setOpen] = React.useState(false);

        useEffect(() => {
            if (error) {
                setOpen(true)
                setTimeout(() => {
                    setOpen(false)
                    clearErrorCallback()
                }, 10000)
            }
        }, [error])


        const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
            if (reason === 'clickaway') {
                return
            }
            setOpen(false)
            clearErrorCallback()
        };
        return (
            <Snackbar  open={open} onClose={handleClose}>
                <Alert variant='filled' onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>
        )
    }
)