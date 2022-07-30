import {NavLink} from "react-router-dom";
import {Path} from "../../pages/Routes";
import s from "./header.module.css"
import {useSelectorApp} from "../../CustomHooks/CustomHooks";

export const Header = () => {
    const isAuthorized = useSelectorApp((state) => state.auth.isAuthorized)


    return (<div>
        <div className={`${s.item} ${s.activeLink}`}>
            {
                !isAuthorized &&
                <NavLink to={Path.login}
                         className={({isActive}) => isActive ? `${s.activeLink}` : `${s.item}`}>
                    Login
                </NavLink>
            }
        </div>
        <div className={`${s.item} ${s.activeLink}`}>

            {!isAuthorized &&
                <NavLink to={Path.registration}
                         className={({isActive}) => isActive ? `${s.activeLink}` : `${s.item}`}>Registration</NavLink>}
        </div>
        <div className={`${s.item} ${s.activeLink}`}><NavLink to={Path.profile}
                                                              className={({isActive}) => isActive ? `${s.activeLink}` : `${s.item}`}>Profile</NavLink>
        </div>
        <div className={`${s.item} ${s.activeLink}`}><NavLink to={Path.example}
                                                              className={({isActive}) => isActive ? `${s.activeLink}` : `${s.item}`}>Example</NavLink>
        </div>
    </div>)
}