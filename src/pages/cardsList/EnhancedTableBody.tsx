import * as React from "react";
import {FC, memo} from "react";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

type EnhancedTableBody = {
    rows: Array<Array<string | number>>
}
export const EnhancedTableBody: FC<EnhancedTableBody> = memo(({rows}) => {

        return (
            <TableBody>
                {rows.map((cells, i) =>
                    <TableRow key={String(cells) + i}>
                        {cells.map((cell, i) => <TableCell key={String(cell) + i}
                                                           align={"right"}>{cell}</TableCell>)}
                    </TableRow>
                )
                }
            </TableBody>
        )
    }
)