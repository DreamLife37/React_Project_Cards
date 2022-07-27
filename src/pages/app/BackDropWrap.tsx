import {useSelectorApp} from "../../CustomHooks/CustomHooks";
import {Backdrop, CircularProgress} from "@mui/material";
import React from "react";

export const BackDropWrap = () => {
    //useSelectorApp кастомный хук, типизировать не надо
    const status = useSelectorApp(state => state.app.status)
    // при инициализации полностью затеняет фон, при загрузке затеняет фон частично
    const toggleBackGround = () => status === 'initialize'?'#282c34':undefined

    return (
        <Backdrop
            sx={{color: '#ffffff', backgroundColor:toggleBackGround, zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={status === 'initialize'||status ==='loading'}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    )
}