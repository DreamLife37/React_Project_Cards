import React, {useEffect} from 'react';
import './App.css';
import {Router} from '../Routes';
import {AlertErrorWrap} from "../../error/AllertErrorWrap";
import {AppBar} from "@mui/material";
import {ResponsiveAppBar} from "./AppBar";
import {useDispatchApp, useSelectorApp} from "../../customHooks/CustomHooks";
import {thunkApp} from "./app-reducer";
import {BackDropWrap} from "./BackDropWrap";
import {thunkAuth} from "../auth/auth-reducer";

function App() {

    const isAuthorized = useSelectorApp(state => state.auth.authData.isAuthorized)
    const authTimeStatus = useSelectorApp(state => state.app.authTimeStatus)
    //useDispatchApp кастомный хук типизировать не надо
    const dispatch = useDispatchApp();

    useEffect(() => {
        if (authTimeStatus === "timeToUpdateToken") {
            console.log("auth time!!")
            dispatch(thunkAuth.authMe())
        }
        if (authTimeStatus === "timeToDie") {
            dispatch(thunkAuth.logout())
        }
    }, [authTimeStatus])

    useEffect(() => {
        if (!isAuthorized) {
            dispatch(thunkApp.initializeApp());
        }
    }, [isAuthorized, dispatch]);

    return (
        <div className="App">
            <header className="App-header">
                <AppBar position="static">
                    <ResponsiveAppBar/>
                </AppBar>
            </header>
            <div className={'App-body'}>
                <Router/>
                {/*Пока что alert для ошибок в будущем хочу заюзать библиотеку https://github.com/iamhosseindhv/notistack*/}
                <AlertErrorWrap/>
                {/*Инициализационная заставка(Если App.statusApp === 'loading' то вкл.)*/}
                <BackDropWrap/>
            </div>
        </div>
    );
}

export default App;


