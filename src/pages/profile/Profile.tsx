import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import image from './profileAvatar.png';
import style from './Profile.module.css';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { AppStoreType } from '../app/store';
import { thunkAuth } from '../auth/auth-reducer';
import { Navigate } from "react-router-dom";
import { Path } from '../Routes';
import { useDispatchApp } from '../../CustomHooks/CustomHooks';

export const Profile = memo(() => {
    const dispatch = useDispatchApp();

    const isAuthorized= useSelector<AppStoreType, boolean>(state => state.auth.isAuthorized);
    const profileName = useSelector<AppStoreType, string>(state => state.auth.name);
    const avatar = useSelector<AppStoreType, string>(state => state.auth.avatar);

    const onClickLogout = () => {
        dispatch(thunkAuth.logout())
    }

    if (!isAuthorized) {
        return <Navigate to={Path.login} />
    }

    return (
        <div className={style.profileWrapper}>
            <aside className={style.profile}>
                <div className={style.profileInfo}>
                    <Button onClick={onClickLogout}>
                        <LogoutIcon />
                    </Button>
                    <img className={style.profileAvatar} src={!!avatar?avatar:image} alt={'avatar'}/>
                    <span className={style.profileName}>{profileName}</span>
                    <span className={style.jobTitle}>Front-end developer</span>
                    <Button 
                        sx={{border: '1px solid rgba(45, 46, 70, 0.4)', color: '#21268F', fontSize: '12px'}}
                        className={style.editButton}
                        variant='outlined'>
                        Edit profile
                    </Button>
                </div>
            </aside>
        </div>
    );
});