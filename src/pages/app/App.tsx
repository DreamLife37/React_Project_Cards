import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Router} from '../Routes';
import {Header} from "../../common/Header/Header";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>

                <HashRouter>
                    <Header/>
                    <Router/>
                </HashRouter>

            </header>
        </div>
    );
}

export default App;
