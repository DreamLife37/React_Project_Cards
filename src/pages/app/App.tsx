import React, {useEffect} from 'react';
import './App.css';
import {Router} from '../Routes';
import {Header} from "../../common/Header/Header";
import {AlertErrorWrap} from "../../Errors/AllertErrorWrap";
import {AppBar} from "@mui/material";
import {ResponsiveAppBar} from "./AppBar";
import {useDispatchApp} from "../../CustomHooks/CustomHooks";
import {thunkApp} from "./app-reducer";
import {BackDropWrap} from "./BackDropWrap";

function App() {
    //useDispatchApp кастомный хук типизировать не надо
    const dispatch = useDispatchApp();

    useEffect(() => {
        dispatch(thunkApp.initializeApp());
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
            {/*Инициализационная заставка(Если App.status === 'loading' то вкл.)*/}
            <BackDropWrap/>
        </div>
    );
}

export default App;


