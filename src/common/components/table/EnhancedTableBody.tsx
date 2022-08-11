import * as React from "react";
import {FC, memo} from "react";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Row} from "../../../pages/cardsList/TableCards";

type EnhancedTableBody = {
    rows: Row[][]
}
export const EnhancedTableBody: FC<EnhancedTableBody> = memo(({rows}) => {

        return (
            <TableBody>
                {rows.map((row, i) =>
                    <TableRow key={String(row) + i}>
                        {
                            row.map((item: Row, i) => <TableCell key={String(item) + i}
                                                                 align={item.optionsCell}>{item.cell}</TableCell>
                            )
                        }
                    </TableRow>
                )
                }
            </TableBody>
        )
    }
)