import React, {useEffect} from 'react';
import './App.css';
import {Router} from '../Routes';
import {Header} from "../../common/Header/Header";
import {AlertErrorWrap} from "../../Errors/AllertErrorWrap";
import {AppBar} from "@mui/material";
import {ResponsiveAppBar} from "./AppBar";
import {useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {thunkApp} from "./app-reducer";
import {BackDropWrap} from "./BackDropWrap";
import {APICards} from "../../DAL/API-Cards";
import {APIPacks} from "../../DAL/API-CardsPack";
import {thunksCards} from "../cardsList/CardsReducer";

function App() {
    //useDispatchApp кастомный хук типизировать не надо
    const isAuthorized= useSelectorApp(state => state.auth.isAuthorized)
    const dispatch = useDispatchApp();

    useEffect(() => {
        if(!isAuthorized){
            dispatch(thunkApp.initializeApp());
        }
    }, [isAuthorized,dispatch]);
    console.log(isAuthorized)

    return (
        <div className="App">
            <header className="App-header">
                <AppBar position="static">
                    <ResponsiveAppBar/>
                </AppBar>
                {/*<Header/>*/}
                <Router/>
            </header>
            {/*Пока что alert для ошибок в будущем хочу заюзать библиотеку https://github.com/iamhosseindhv/notistack*/}
            <AlertErrorWrap/>
            {/*Инициализационная заставка(Если App.status === 'loading' то вкл.)*/}
            <BackDropWrap/>
            {/*<TestAPIPage/>*/}
        </div>
    );
}

export default App;


