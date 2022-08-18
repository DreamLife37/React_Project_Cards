import {thunkAuth} from "../../pages/auth/auth-reducer";
import {actionsErrors} from "../../error/ErrorsReducer";
import {convertFileToBase64} from "./convertFileToBase64";
import {AppDispatchType} from "../../pages/app/store";
import {ChangeEvent} from "react";

export const uploadFile = (e:ChangeEvent<HTMLInputElement>,dispatch:AppDispatchType) => {
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
