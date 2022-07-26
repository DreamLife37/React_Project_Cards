import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Router} from '../Routes';
import {Header} from "../../common/Header/Header";
import {AlertErrorWrap} from "../../Errors/AllertErrorWrap";
import {useSelector} from "react-redux";
import {AppStoreType} from "./store";
import {AppBar} from "@mui/material";
import {ResponsiveAppBar} from "./AppBar";

function App() {
    const status = useSelector((state: AppStoreType) => state.app.status)
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


