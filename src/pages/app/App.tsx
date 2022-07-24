import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Router} from '../Routes';
import {Header} from "../../common/Header/Header";
import { Profile } from '../profile/Profile';
import {AlertErrorWrap} from "../../Errors/AllertErrorWrap";
import {useSelector} from "react-redux";
import {AppStoreType} from "./store";

function App() {
    const status = useSelector((state: AppStoreType) => state.app.status)
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <HashRouter>
                    <Header/>
                    <Router/>
                    <Profile />
                </HashRouter>

            </header>

            <AlertErrorWrap/>
        </div>
    );
}

export default App;


