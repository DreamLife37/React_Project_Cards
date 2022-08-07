import {Button, TextField} from "@mui/material";
import image from './profileAvatar.png';
import {FC, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {thunkAuth} from '../auth/auth-reducer';
import style from './Profile.module.css';
import {useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {Path} from "../Routes";
import {Container} from "@mui/material";
import Grid from '@mui/material/Grid';
import React from "react"

export const Profile: FC = () => {

    const dispatch = useDispatchApp();

    const isAuthorized = useSelectorApp(state => state.auth.isAuthorized);
    const profileName = useSelectorApp(state => state.auth.name);
    const profileEmail = useSelectorApp(state => state.auth.email);
    const avatar = useSelectorApp(state => state.auth.avatar);

    const [changeNameStatus, setChangeNameStatus] = useState(false);
    const [inputValue, setInputValue] = useState(profileName);

    const logout = () => {
        dispatch(thunkAuth.logout())
    }

    const onChangeNameStatus = () => {
        dispatch(thunkAuth.setNameOrAvatar({name: inputValue}))
        setChangeNameStatus(!changeNameStatus)
    }

    const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    if (!isAuthorized) {
        return <Navigate to={Path.login}/>
    }

    return (
        <div>
            <Container fixed>
                <Grid container justifyContent='center' bgcolor='white' padding={1} borderRadius={1} m={1}>
                    <Grid item justifyContent={'center'}>
                        <div className={style.backLinkWrapper}>
                            <Link className={style.backArrow} to={Path.packsList}>&#8592;</Link>
                            <span className={style.backLinkTitle}>Back to Packs List</span>
                        </div>

                        <div className={style.personalInfo}>
                            <h1 className={style.title}>Personal Information</h1>

                            <img src={!!avatar ? avatar : image} className={style.avatar} alt={"AVA"}/>

                            <input type='file' className={style.setAvatarInput} id='fileInput'/>
                            <label className={style.setAvatarInputLabel} htmlFor='fileInput'/>

                            <div className={style.changeNameWrapper}>
                                {changeNameStatus ?
                                    <>
                                        <TextField
                                            sx={{width: '347px', position: 'relative', marginLeft: '55px'}}
                                            id="standard-multiline-flexible"
                                            label="Nickname"
                                            multiline
                                            maxRows={4}
                                            value={inputValue}
                                            onChange={onChangeInputValue}
                                            variant="standard"
                                        />
                                        <Button className={style.saveBtn}
                                                sx={{
                                                    width: '52px',
                                                    height: '24px',
                                                    fontSize: '12px',
                                                    lineHeight: '24px'
                                                }}
                                                variant="contained"
                                                onClick={onChangeNameStatus}>
                                            save
                                        </Button>
                                    </>
                                    :
                                    <>
                                        <p className={style.name}>{profileName}</p>
                                        <button type='button' className={style.changeNameBtn}
                                                onClick={onChangeNameStatus}/>
                                    </>
                                }
                            </div>

                            <p className={style.email}>{profileEmail}</p>

                            <button
                                type="button"
                                className={style.logoutBtn}
                                onClick={logout}>
                                Log out
                            </button>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}