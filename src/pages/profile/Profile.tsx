import Button from '@mui/material/Button';
import image from './profileAvatar.png';
import style from './Profile.module.css';
import { memo } from 'react';

export const Profile = memo(() => {
    return (
        <div className={style.profileWrapper}>
            <aside className={style.profile}>
                <div className={style.profileInfo}>
                    <img className={style.profileAvatar} src={image}></img>
                    <span className={style.profileName}>Ivan Ivanov</span>
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