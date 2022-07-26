import React, { useEffect } from 'react';
import './App.css';
import {Router} from '../Routes';
import {Header} from "../../common/Header/Header";
import {AlertErrorWrap} from "../../Errors/AllertErrorWrap";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "./store";
// import { thankProfile } from '../profile/profileReducer';
import { thunkAuth } from '../auth/auth-reducer';
import {AppBar} from "@mui/material";
import {ResponsiveAppBar} from "./AppBar";

function App() {
    const dispatch = useDispatch();
    const status = useSelector((state: AppStoreType) => state.app.status)

    useEffect(() => {
        dispatch<any>(thunkAuth.authMe());
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <AppBar position="static">
                    <ResponsiveAppBar/>
                </AppBar>
                <Header/>
                <Router/>
            </header>

            <AlertErrorWrap/>
        </div>
    );
}

export default App;


