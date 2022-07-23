import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Router} from '../Routes';
import {Header} from "../../common/Header/Header";
import {AlertErrorWrap} from "../../Errors/AllertErrorWrap";

function App() {
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


