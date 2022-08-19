import {convertFileToBase64} from "./convertFileToBase64";
import {ChangeEvent} from "react";

export const uploadFile = (e:ChangeEvent<HTMLInputElement>,callback:any) => {
    if (e.target.files && e.target.files.length) {
        const file = e.target.files[0]
        if (file.size < 4000000) {
             convertFileToBase64(file, (file64: string) => {
                callback(file64)
            })
        }
    }
}
