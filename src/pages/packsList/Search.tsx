import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {useDebouncedEffect, useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {useState} from "react";
import {thunksPack} from "./PackReducer";

export const Search = () => {

    const [valueSearch, setValueSearch] = useState("")
    const packName=useSelectorApp(state => state.packs.queryParams.packName)
    const dispatch = useDispatchApp()

    const alive = () => {
        setValueSearch("")
    }

    const searchAll = () => {
        dispatch(thunksPack.searchOnName(''))
    }

    useDebouncedEffect(() => {
        if (!valueSearch.trim()) {
            return
        }
        dispatch(thunksPack.searchOnName(valueSearch))
    }, [valueSearch], 1000);


    return (
        <Paper
            component="form"
            sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 350}}
        >

            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Search Pack"
                onBlur={alive}
                onChange={(e) => setValueSearch(e.currentTarget.value)}
                value={valueSearch}
                inputProps={{'aria-label': 'search google maps'}}
            />
            <IconButton onClick={searchAll}
                type="submit" sx={{p: '10px'}} aria-label="search">
                {!!packName?<>all</>:<SearchIcon/>}
            </IconButton>


        </Paper>)
}