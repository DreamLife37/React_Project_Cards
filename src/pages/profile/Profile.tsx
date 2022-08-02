import { Button, TextField } from "@mui/material";
import image from './profileAvatar.png';
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { AppStoreType } from '../app/store';
import { thunkAuth } from '../auth/auth-reducer';
import style from './Profile.module.css';
import { useDispatchApp } from "../../CustomHooks/CustomHooks";
import { Path } from "../Routes";

export const Profile: FC = () => {
    const dispatch = useDispatchApp();

    const isAuthorized= useSelector<AppStoreType, boolean>(state => state.auth.isAuthorized);
    const profileName = useSelector<AppStoreType, string>(state => state.auth.name);
    const profileEmail = useSelector<AppStoreType, string>(state => state.auth.email);
    const avatar = useSelector<AppStoreType, string>(state => state.auth.avatar);
    const isLoading = useSelector<AppStoreType, string>(state => state.app.status);

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
        return <Navigate to={Path.login} />
    }

    return (
            <div className={style.wrapper}>
                <div className={style.backLinkWrapper}>
                    <Link className={style.backArrow} to={Path.packsList}>&#8592;</Link>
                    <span className={style.backLinkTitle}>Back to Packs List</span>    
                </div>
                

                <div className={style.personalInfo}>
                    <h1 className={style.title}>Personal Information</h1>

                    <img src={!!avatar ? avatar : image} className={style.avatar}></img>

                    <input type='file' className={style.setAvatarInput} id='fileInput'></input>
                    <label className={style.setAvatarInputLabel} htmlFor='fileInput'></label>
                    
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
                                sx={{width: '52px', height: '24px', fontSize: '12px', lineHeight: '24px'}}
                                variant="contained"
                                onClick={onChangeNameStatus}>
                                save
                            </Button>
                        </>
                        :
                        <>
                            <p className={style.name}>{profileName}</p>
                            <button type='button' className={style.changeNameBtn} onClick={onChangeNameStatus}></button>
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
            </div>
    )
}