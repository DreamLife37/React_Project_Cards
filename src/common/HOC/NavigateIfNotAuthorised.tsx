import React, {useEffect} from "react";
import {useSelectorApp} from "../../CustomHooks/CustomHooks";
import {useNavigate} from "react-router-dom";
import {Path} from "../../pages/Routes";


export function NavigateIfNotAuthorised<P>(WrappedComponent: React.ComponentType<P>) {

    const Foo = (props: P) => {
        const isAuthorized = useSelectorApp(state => state.auth.isAuthorized)
        const navigate = useNavigate()

        useEffect(() => {
            if (!isAuthorized) {
                navigate(Path.login)
            }
        }, [isAuthorized])

        return <WrappedComponent {...props}/>
    }

    return Foo
}


