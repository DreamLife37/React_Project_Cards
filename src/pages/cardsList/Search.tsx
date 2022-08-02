import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {useDispatchApp} from "../../CustomHooks/CustomHooks";
import {useState} from "react";

export const Search = () => {

    const [valueSearch, setValueSearch]=useState("")

    const dispatch= useDispatchApp()

    const search = () => {
      if(!valueSearch.trim()){return}
      // dispatch(thunksPack.searchOnName(valueSearch))
        setValueSearch('')
    }


    return (
        <Paper
            component="form"
            sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 350}}
        >

            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Search Pack"
                onChange={(e)=>setValueSearch(e.currentTarget.value)}
                value={valueSearch}
                inputProps={{'aria-label': 'search google maps'}}
            />
            <IconButton onClick={search} type="submit" sx={{p: '10px'}} aria-label="search">
                <SearchIcon/>
            </IconButton>


        </Paper>)
}