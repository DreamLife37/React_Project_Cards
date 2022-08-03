import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import {HeadCell} from "../../../pages/cardsList/TableCards";
import {Typography} from "@mui/material";

interface EnhancedTableProps {
    headCells: HeadCell[]
}

export const EnhancedTableHead: React.FC<EnhancedTableProps> = ({headCells}) => {


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
                                active={true}
                                // direction={orderBy === headCell.id ? order : 'asc'}
                                // onClick={createSortHandler(headCell.id)}
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