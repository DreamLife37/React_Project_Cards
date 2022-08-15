import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {thunksPack} from "./PackReducer";
import {useDebouncedEffect, useDispatchApp, useSelectorApp} from "../../customHooks/CustomHooks";


export function NumberOfCards() {
    const dispatch = useDispatchApp()
    const sortPackMinValue = useSelectorApp(state => state.packs.queryParams.min)
    const sortPackMaxValue = useSelectorApp(state => state.packs.queryParams.max)

    const [value, setValue] = React.useState<number[]>([sortPackMinValue ? sortPackMinValue : 0, sortPackMaxValue ? sortPackMaxValue : 100]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);

    };

   const handleChangeCommitted = (event: React.SyntheticEvent | Event, value: number | Array<number>) => {
      if(value instanceof Array<number>) {
          dispatch(thunksPack.sortPackMinMax(value[0], value[1]))
      }
   }

    return (
        <Box sx={{width: 300}}>
            <Slider
                onChangeCommitted={handleChangeCommitted}
                getAriaLabel={() => 'Min and Max cards'}
                value={value}
                valueLabelDisplay="on"
                onChange={handleChange}
            />
        </Box>
    );
}
