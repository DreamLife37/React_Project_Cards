import {useSelectorApp} from "../../CustomHooks/CustomHooks";
import {Backdrop, CircularProgress} from "@mui/material";
import React from "react";

export const BackDropWrap = () => {
    //useSelectorApp кастомный хук, типизировать не надо
    const status = useSelectorApp(state => state.app.status)

    const toggleBackGround = () => {
       if (status === 'initialize'){
           return '#282c34'
       }else {
           return ''
       }


    }

    return (
        <Backdrop
            sx={{color: '#ffffff', backgroundColor:toggleBackGround, zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={status === ('initialize'||'loading')}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    )
}