import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {thunksPack} from "./PackReducer";
import {useDebouncedEffect, useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";



function valuetext(value: number) {
    return `${value}°C`;
}

export function NumberOfCards() {
    const dispatch = useDispatchApp()

    const [value, setValue] = React.useState<number[]>([1, 37]);


    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);

    };


    useDebouncedEffect(() => {
        // if (!valueSearch.trim()) {
        //     return
        // }
        dispatch(thunksPack.sortPackMin(value[0]))
    }, [value], 1000);


    return (
        <Box sx={{width: 300}}>
            <Slider
                getAriaLabel={() => 'Min and Max cards'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
            />
        </Box>
    );
}
