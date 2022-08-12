import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {thunksPack} from "./PackReducer";
import {useDebouncedEffect, useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";


export function NumberOfCards() {
    const dispatch = useDispatchApp()
    const sortPackMinValue = useSelectorApp(state => state.packs.queryParams.min)
    const sortPackMaxValue = useSelectorApp(state => state.packs.queryParams.max)

    const [value, setValue] = React.useState<number[]>([sortPackMinValue ? sortPackMinValue : 0, sortPackMaxValue ? sortPackMaxValue : 100]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);

    };

    useDebouncedEffect(() => {
        dispatch(thunksPack.sortPackMinMax(value[0], value[1]))
    }, [value], 1000);

    return (
        <Box sx={{width: 300}}>
            <Slider
                getAriaLabel={() => 'Min and Max cards'}
                value={value}
                valueLabelDisplay="on"
                onChange={handleChange}
            />
        </Box>
    );
}
