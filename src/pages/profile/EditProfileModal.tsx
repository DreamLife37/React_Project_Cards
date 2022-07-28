import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import image from './profileAvatar.png';
import style from './Profile.module.css';
import { FC, useState } from 'react';

type PropsType = {
    email: string
    name: string
    onClickShowModalButton: () => void
}

export const EditProfileModal: FC<PropsType> = ({email, name, onClickShowModalButton}) => {
    const [emailValue, setEmailValue] = useState(email);
    const [nameValue, setNameValue] = useState(name);

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(event.target.value);
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(event.target.value);
    }

    return (
        <div className={style.profileModal}>
            <h1 className={style.modalTitle}>Personal information</h1>
            <img className={style.profileAvatar} src={image}></img>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '25ch' },
                }}
                noValidate
                autoComplete="off">
                <div className={style.formWrapper}>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Nickname"
                        multiline
                        maxRows={4}
                        value={nameValue}
                        onChange={handleChangeName}
                        variant="standard"
                    />
                    <TextField
                        id="standard-multiline-flexible"
                        label="Email"
                        multiline
                        maxRows={4}
                        value={emailValue}
                        onChange={handleChangeEmail}
                        variant="standard"
                    />
                </div>
            </Box>
            <Stack justifyContent='space-between' direction="row" width='316px' margin='0 auto'>
                <Button variant="contained" onClick={onClickShowModalButton}>Cancel</Button>
                <Button variant="contained">Save</Button>
            </Stack>
        </div>
    )
}