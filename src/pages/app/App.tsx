import React, {useEffect} from 'react';
import './App.css';
import {Router} from '../Routes';
import {AlertErrorWrap} from "../../Errors/AllertErrorWrap";
import {AppBar} from "@mui/material";
import {ResponsiveAppBar} from "./AppBar";
import {useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {thunkApp} from "./app-reducer";
import {BackDropWrap} from "./BackDropWrap";

function App() {
    //useDispatchApp кастомный хук типизировать не надо
    const isAuthorized= useSelectorApp(state => state.auth.isAuthorized)
    const dispatch = useDispatchApp();

    useEffect(() => {
        if(!isAuthorized){
            dispatch(thunkApp.initializeApp());
        }
    }, [isAuthorized,dispatch]);

    return (
        <div className="App">
            <header className="App-header">
                <AppBar position="static">
                    <ResponsiveAppBar/>
                </AppBar>
                {/*<Header/>*/}
            </header>
            <body className={'App-body'}>
            <Router/>
            {/*Пока что alert для ошибок в будущем хочу заюзать библиотеку https://github.com/iamhosseindhv/notistack*/}
            <AlertErrorWrap/>
            {/*Инициализационная заставка(Если App.status === 'loading' то вкл.)*/}
            <BackDropWrap/>
            {/*<TestAPIPage/>*/}
            </body>
        </div>
    );
}

export default App;


