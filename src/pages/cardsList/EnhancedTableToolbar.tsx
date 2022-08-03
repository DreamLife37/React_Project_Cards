import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {FC, memo} from "react";

type EnhancedTableToolbar={
    title:string
}
export const EnhancedTableToolbar:FC<EnhancedTableToolbar> = memo( ({title}) => {

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
            }}
        >
            <Typography
                sx={{flex: '1 1 100%'}}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                {title}
            </Typography>

        </Toolbar>
    );
}
)