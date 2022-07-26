import {Route, Routes} from "react-router-dom";
import {RegistrationPage} from "./auth/registration/RegistrationPage";
import {Login} from "./auth/login/Login";
import {Error404} from "./404/Error404";
import {RestorePassword} from "./auth/recovery-password/restorePassword";
import {SetNewPassword} from "./auth/enter-new-password/SetNewPassword";
import {Example} from "./example/Example";
import {Profile} from "./profile/Profile";
import {RedirectPage} from "./auth/recovery-password/RedirectPage";


export enum Path {
    login = '/login',
    registration = '/registration',
    profile = '/profile',
    error404 = '/error404',
    restorePassword = '/restore-password',
    setNewPassword = '/set-new-password',
    example = '/example',
    redirectAfterSendRecoveryPassEmail='/redirect-page'
}

export const Router = () => {
    return (
        <div>
            <Routes>
                <Route path={Path.login} element={<Login/>}/>
                <Route path={Path.registration} element={<RegistrationPage/>}/>
                <Route path={Path.profile} element={<Profile/>}/>
                <Route path={Path.error404} element={<Error404/>}/>
                <Route path={Path.restorePassword} element={<RestorePassword/>}/>
                <Route path={Path.setNewPassword} element={<SetNewPassword/>}>
                    <Route path=':token' element={<SetNewPassword/>}/>
                </Route>
                <Route path={Path.example} element={<Example/>}/>
                <Route path={Path.redirectAfterSendRecoveryPassEmail} element={<RedirectPage/>}/>
            </Routes>
        </div>
    )
}

