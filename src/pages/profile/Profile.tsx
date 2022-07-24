import style from './Profile.module.css';

export const Profile = () => {
    return (
        <div className={style.profileWrapper}>
            <aside className={style.profile}>
                <div className={style.profileInfo}>
                    <img src='#'></img>
                    <span className={style.profileName}>Ivan Ivanov</span>
                    <span className={style.jobTitle}>Front-end developer</span>
                    <button>Edit Profile</button>
                </div>
            </aside>
        </div>
    );
};