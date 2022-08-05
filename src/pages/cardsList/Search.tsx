import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {FC, useState} from "react";
import {useDebouncedEffect} from "../../CustomHooks/CustomHooks";

type Search={
    searchCallback:(valueSearch:string)=>void
}
export const Search:FC<Search> = ({searchCallback }) => {

    const [valueSearch, setValueSearch]=useState("")

    useDebouncedEffect(()=>{

            if(!valueSearch.trim()){return}
            searchCallback(valueSearch)

    },[valueSearch],600)

    const searchAll = () => {
        searchCallback("")
        setValueSearch("")
    }

    return (
        <Paper
            component="form"
            sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 350}}
        >
            <IconButton onClick={searchAll}  type="submit" sx={{p: '10px'}} aria-label="search">
                {!!valueSearch?"all":<SearchIcon/>}
            </IconButton>
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Search Card"
                onChange={(e)=>setValueSearch(e.currentTarget.value)}
                value={valueSearch}
                inputProps={{'aria-label': 'search google maps'}}
            />
        </Paper>)
}

