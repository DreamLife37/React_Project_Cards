import React, {
    ChangeEvent,
    DetailedHTMLProps,
    HTMLAttributes,
    useState
} from "react";

import {Box, TextField} from "@mui/material";
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
    editModeControlled?: boolean
    setEditModeControlled?: React.Dispatch<React.SetStateAction<boolean>>
}
export const CustomEditSpan: React.FC<CustomEditSpanPropsType> = React.memo((props) => {

        const {
            onChange, value, error, onEnter, spanProps, onChangeText,
            editModeControlled, setEditModeControlled, onBlurInput, ...restProps
        } = props

        const [editMode, setEditMode] = useState<boolean>(false)
        const [valueTextField, setValueTextField] = useState<string>(value)
        const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {}

        const onEnterCallBack = (key: string) => {
            if (key !== 'Enter') {
                return
            }

            setEditModeControlled ?
                setEditModeControlled(false) :
                setEditMode(false)
            onEnter && onEnter()
        }

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
            onBlurInput && onBlurInput(valueTextField)
        }

        const onChangeCallBack = (e: ChangeEvent<HTMLInputElement>) => {
            setValueTextField(e.currentTarget.value)
            // onChange && onChange(e)
            // onChangeText && onChangeText(e.currentTarget.value)
        }

        const finalClassName = `${className}`

        return (

            <Box component={"span"} data-testid='Box'>
                {
                    editMode || editModeControlled ?
                        <span>
                            <TextField
                                error={!!error}
                                onKeyPress={(e) => {
                                    onEnterCallBack(e.key)
                                }}
                                onChange={onChangeCallBack}
                                helperText={!!error ? error : false}
                                onBlur={onBlurCallBack}
                                id="standard-error"
                                {...restProps}
                                value={valueTextField}/>
                        </span>
                        :
                        <span onDoubleClick={onDoubleClickCallBack}
                              data-testid='span'
                              className={finalClassName}
                              {...restSpanProps}>
                                         {children || value}
                        </span>
                }

            </Box>
        )
    }
)
