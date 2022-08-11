import React from "react";
import {FC, memo} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TablePagination from "@mui/material/TablePagination";
import {Row} from "../../../pages/cardsList/TableCards";
import {EnhancedTableHead} from "./EnhancedTableHead";
import {EnhancedTableBody} from "./EnhancedTableBody";

export type Numeric = "inherit" | "right" | "left" | "center" | "justify" | undefined;

export interface HeadCell {
    numeric: Numeric
    id: string,
    label: string;
    order: "0" | "1" | undefined
}

type CommonTable = {
    headCells: Array<HeadCell>
    rows: Row[][]
    sortHandler: (headCell: HeadCell) => void
    cardsTotalCount: number
    onPageChangeHandler: (newPage: number) => void
    onRowsPerPageChangeHandler: (newTotalCount: number) => void
    pageCount: number
    page: number
}

//универсальная таблица ждет название, массив из масивов  и массив обьектов для шапки таблицы:
export const CommonTable: FC<CommonTable> = memo((props) => {
        const {
            onPageChangeHandler,
            onRowsPerPageChangeHandler,
            sortHandler,
            rows,
            headCells,
            cardsTotalCount,
            pageCount,
            page
        } = props

        const onPageChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
            onPageChangeHandler(newPage)
        }

        const onRowsPerPageChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            onRowsPerPageChangeHandler(+event.target.value)
        }
        return (
            <Box>
                <Paper sx={{margin: 'auto', maxWidth: 1000, flexGrow: 1}}>
                    <TableContainer>
                        <Table aria-labelledby="tableTitle">
                            <EnhancedTableHead sortHandler={sortHandler} headCells={headCells}/>
                            <EnhancedTableBody rows={rows}/>
                        </Table>
                    </TableContainer>
                    {rows.length === 0 && <>Packs/cards not found or you no authorized</>}
                    <TablePagination
                        rowsPerPageOptions={[4, 10, 20]}
                        component="div"

                        count={!!cardsTotalCount ? cardsTotalCount : 1}
                        rowsPerPage={!!pageCount ? pageCount : 4}
                        page={!!page ? page : 0}

                        onPageChange={onPageChange}
                        onRowsPerPageChange={onRowsPerPageChange}
                    />
                </Paper>
            </Box>
        )
    }
)




