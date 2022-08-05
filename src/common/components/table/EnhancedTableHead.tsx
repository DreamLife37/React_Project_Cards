import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import {HeadCell} from "../../../pages/cardsList/TableCards";
import {Typography} from "@mui/material";
import {useEffect, useState} from "react";

interface EnhancedTableProps {
    headCells: HeadCell[]
    sortHandler: (headCell:HeadCell) => void
}

export const EnhancedTableHead: React.FC<EnhancedTableProps> = ({sortHandler, headCells}) => {


    const createSortHandler = (headCell:HeadCell) => () => {
        if(!headCell.order){return}
        sortHandler(headCell)
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? headCell.numeric : "center"}
                    >
                        <Typography>
                            <TableSortLabel
                                hideSortIcon={!headCell.order}
                                active={!!headCell.order}
                                direction={headCell.order&&headCell.order==="0"?"asc":"desc"}
                                onClick={createSortHandler(headCell)}
                            >
                                {headCell.label}
                            </TableSortLabel>
                        </Typography>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}