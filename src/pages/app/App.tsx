import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Router} from '../Routes';
import {Header} from "../../common/Header/Header";
import { Profile } from '../profile/Profile';

function App() {
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
        </div>
    );
}

export default App;
