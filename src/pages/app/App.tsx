import React, { useEffect } from 'react';
import logo from '../../logo.svg';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Router} from '../Routes';
import {Header} from "../../common/Header/Header";
import {AlertErrorWrap} from "../../Errors/AllertErrorWrap";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "./store";
// import { thankProfile } from '../profile/profileReducer';
import { thunkAuth } from '../auth/auth-reducer';

function App() {
    const dispatch = useDispatch();
    const status = useSelector((state: AppStoreType) => state.app.status)

    useEffect(() => {
        dispatch<any>(thunkAuth.authMe());
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <HashRouter>
                    <Header/>
                    <Router/>
                </HashRouter>

            </header>

            <AlertErrorWrap/>
        </div>
    );
}

export default App;


