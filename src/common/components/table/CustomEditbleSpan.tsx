import React, {
    ChangeEvent,
    DetailedHTMLProps,
    HTMLAttributes, ReactNode,
    useState
} from "react";

import {Box, TextField, Typography} from "@mui/material";
import {TextFieldProps} from "@mui/material/TextField/TextField";


type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
type CustomEditSpanPropsType = TextFieldProps & {
    onChangeText?: React.Dispatch<React.SetStateAction<string>>
    onEnter?: () => void
    spanClassName?: string
    spanProps?: DefaultSpanPropsType
    onBlurInput?: (value: string) => void
    onClick?: () => void
    value: string
    jsxElement?:ReactNode
    editModeControlled?: boolean
    setEditModeControlled?: React.Dispatch<React.SetStateAction<boolean>>
}
export const CustomEditSpan: React.FC<CustomEditSpanPropsType> = React.memo((props) => {

        const {
            onChange, jsxElement, value, error, onEnter, spanProps, onChangeText,
            editModeControlled, setEditModeControlled, onBlurInput, ...restProps
        } = props

        const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {}

        const [editMode, setEditMode] = useState<boolean>(false)
        const [valueTextField, setValueTextField] = useState<string>(value)


        const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
            setEditModeControlled ?
                setEditModeControlled(true) :
                setEditMode(true)
            onDoubleClick && onDoubleClick(e)

        }
        const onBlurCallBack = () => {
            setEditModeControlled ?
                setEditModeControlled(false) :
                setEditMode(false)
            onBlurInput && valueTextField!==value && onBlurInput(valueTextField)
        }

        const onChangeCallBack = (e: ChangeEvent<HTMLInputElement>) => {
            setValueTextField(e.currentTarget.value)
        }

        return (

            <Typography component={"span"} sx={{display:'flex',wrap:"noWrap", alignItems:"center",justifyContent:"center"}}>
                {
                    editMode || editModeControlled ?
                        <span>
                            <TextField
                                error={!!error}
                                onChange={onChangeCallBack}
                                helperText={!!error ? error : false}
                                onBlur={onBlurCallBack}
                                id="standard-error"
                                {...restProps}
                                value={valueTextField}/>
                        </span>
                        :

                        <span  onDoubleClick={onDoubleClickCallBack}
                              className={className}
                              {...restSpanProps}>
                                         {children || value}
                        </span>

                }
                {jsxElement && jsxElement}
            </Typography>
        )
    }
)
