import {Route, Routes} from "react-router-dom";
import {RegistrationPage} from "./auth/registration/RegistrationPage";
import {Login} from "./auth/login/Login";
import {Error404} from "./404/Error404";
import {RestorePassword} from "./auth/recovery-password/restorePassword";
import {SetNewPassword} from "./auth/enter-new-password/SetNewPassword";
import {Profile} from "./profile/Profile";
import {RedirectPage} from "./auth/recovery-password/RedirectPage";
import {Settings} from "./Settings";
import {PacksListPage} from "./packsList/PacksListPage";
import {CardsPage} from "./cardsList/TableCards";
import {LearnPage} from "./learn/LearnPage";
import {NavigateIfNotAuthorised} from "../common/HOC/NavigateIfNotAuthorised";


export enum Path {
    login = '/login',
    registration = '/registration',
    profile = '/profile',
    error404 = '/error404',
    restorePassword = '/restore-password',
    setNewPassword = '/set-new-password',
    redirectAfterSendRecoveryPassEmail = '/redirect-page',
    settings = '/settings',
    packsList = '/packsList',
    cardList='/cardList',
    learn='/learn'
}

export const Router = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Profile/>}/>
                <Route path={'/React_Project_Cards/set-new-password'} element={<SetNewPassword/>}/>
                <Route path={Path.login} element={<Login/>}/>
                <Route path={Path.registration} element={<RegistrationPage/>}/>
                <Route path={Path.profile} element={<Profile/>}/>
                <Route path={Path.error404} element={<Error404/>}/>
                <Route path={Path.restorePassword} element={<RestorePassword/>}/>
                <Route path={Path.setNewPassword} element={<SetNewPassword/>}>
                    <Route path=':token' element={<SetNewPassword/>}/>
                </Route>
                <Route path={Path.redirectAfterSendRecoveryPassEmail} element={<RedirectPage/>}/>
                <Route path={Path.settings} element={<Settings/>}/>
                <Route path={Path.packsList} element={<PacksListPage/>}/>
                <Route path={Path.cardList} element={<CardsPage/>}/>
                <Route path={Path.learn} element={<LearnPage/>}/>
            </Routes>
        </div>
    )
}

