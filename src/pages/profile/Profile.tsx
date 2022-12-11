import {Button, Container, TextField} from "@mui/material";
import React, {ChangeEvent, FC, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {thunkAuth} from '../auth/auth-reducer';
import style from './Profile.module.css';
import {useDispatchApp, useSelectorApp} from "../../customHooks/CustomHooks";
import {Path} from "../Routes";
import Grid from '@mui/material/Grid';
import {NavigateIfNotAuthorised} from "../../common/HOC/NavigateIfNotAuthorised";
import {convertFileToBase64} from "../../common/utils/convertFileToBase64";
import defaultAva from "../../assets/images/defaultAva.jpg"
import {actionsErrors} from "../../error/ErrorsReducer";
import {uploadFile} from "../../common/utils/uploadFile";

export const Profile: FC = NavigateIfNotAuthorised(() => {

    const dispatch = useDispatchApp();

    const isAuthorized = useSelectorApp(state => state.auth.authData.isAuthorized);
    const profileName = useSelectorApp(state => state.auth.authData.name);
    const profileEmail = useSelectorApp(state => state.auth.authData.email);
    const avatar = useSelectorApp(state => state.auth.authData.avatar);

    const [changeNameStatus, setChangeNameStatus] = useState(false);
    const [inputValue, setInputValue] = useState(profileName);

    const logout = () => {
        dispatch(thunkAuth.logout())
    }

    const onChangeNameStatus = () => {
        if (inputValue === profileName) {
            setChangeNameStatus(false)
            return
        }
        dispatch(thunkAuth.setNameOrAvatar({name: inputValue}))
        setChangeNameStatus(false)
    }

    const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    dispatch(thunkAuth.setNameOrAvatar({avatar: file64}))
                })
            } else {
                dispatch(actionsErrors.changeError('File is too big'))
            }
        }
    }

    const errorHandler = () => {
        dispatch(thunkAuth.setNameOrAvatar({avatar: ' '}))
        dispatch(actionsErrors.changeError('Type file no correct'))
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

                            <img src={avatar?.length ? avatar : defaultAva} className={style.avatar}
                                 alt={"avatar"}
                                 onError={errorHandler}/>

                            <input type='file' className={style.setAvatarInput} id='fileInput'
                                   onChange={onUploadHandler}/>
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
                                                onClick={() => {
                                                    setChangeNameStatus(true)
                                                }}/>
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
})