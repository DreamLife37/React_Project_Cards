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
                <Header/>
                <Router/>
            </header>
            {/*Пока что alert для ошибок в будущем хочу заюзать библиотеку https://github.com/iamhosseindhv/notistack*/}
            <AlertErrorWrap/>
            {/*Инициализационная заставка(Если App.status === 'loading' то вкл.)*/}
            <BackDropWrap/>
            <TestAPIPage/>
        </div>
    );
}

export default App;

export const TestAPIPage=()=>{

    const getCards = () => {
      APICards.getCards({cardsPack_id:"62e570c51c90be4f10b2554c"})
          .then((res)=>{
              console.log(res)})
    }
    const createCard = () => {

        APICards.createCard({cardsPack_id:"62e570c51c90be4f10b2554c"}).then((res)=>{
            console.log(res)})
    }
    const getPack = () => {
      APIPacks.getCardPacks({user_id: "62dfe5868cf0b21258ba4d48"})
    .then((res)=>{
            console.log(res)})
    }
   const createPack = () => {
       APIPacks.createNewCardPack({name:"Test paaaack"})
           .then((res)=>{
               console.log(res)})
   }
    const updateCardPack = () => {
        APIPacks.updateCardPack({_id:"62e576951c90be4f10b25551",name:"???"})
            .then((res)=>{
                console.log(res)})
    }
    const updateCard = () => {
        APICards.updateCard({_id:"62e576e01c90be4f10b25554",answer:"test azaza",type:"card hyiard"})
            .then((res)=>{
                console.log(res)})
    }
    const deleteCard = () => {
        APICards.deleteCard("62e576e01c90be4f10b25554")
            .then((res)=>{
                console.log(res)})
    }
    const deletePack = () => {
        APIPacks.deleteCardPack("62e576951c90be4f10b25551")
            .then((res)=>{
                console.log(res)})
    }




    return(
        <>
            <button onClick={getCards}>getCards</button>
            <button onClick={createCard}>createCard</button>
            <button onClick={getPack}>getPack</button>
            <button onClick={createPack}>createPack</button>
            <button onClick={updateCardPack}>updateCardPack</button>
            <button onClick={updateCard}>updateCard</button>
            <button onClick={deleteCard}>deleteCard</button>
            <button onClick={deletePack}>deletePack</button>
        </>
    )
}


