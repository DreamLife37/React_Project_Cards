import {Route, Routes} from "react-router-dom";
import {RegistrationPage} from "./auth/registration/RegistrationPage";
import {Login} from "./auth/login/Login";
import {Error404} from "./404/Error404";
import {RecoveryPassword} from "./auth/recovery-password/recoveryPassword";
import {EnterNewPassword} from "./auth/enter-new-password/EnterNewPassword";
import {Example} from "./example/Example";
import {Profile} from "./profile/Profile";


export enum Path {
    login = '/login',
    registration = '/registration',
    profile = '/profile',
    error404 = '/error404',
    restorePassword = '/restore-password',
    enterNewPassword = '/enter-new-password',
    example = '/example'
}

export const Router = () => {
    return (
        <div>
            <Routes>
                <Route path={Path.login} element={<Login/>}/>
                <Route path={Path.registration} element={<RegistrationPage/>}/>
                <Route path={Path.profile} element={<Profile/>}/>
                <Route path={Path.error404} element={<Error404/>}/>
                <Route path={Path.restorePassword} element={<RecoveryPassword/>}/>
                <Route path={Path.enterNewPassword} element={<EnterNewPassword/>}/>
                <Route path={Path.example} element={<Example/>}/>
            </Routes>
        </div>
    )
}