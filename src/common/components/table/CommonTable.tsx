import * as React from "react";
import {FC, memo, ReactNode} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TablePagination from "@mui/material/TablePagination";
import {HeadCell} from "../../../pages/cardsList/TableCards";
import {EnhancedTableToolbar} from "./EnhancedTableToolbar";
import {EnhancedTableHead} from "./EnhancedTableHead";
import {EnhancedTableBody} from "./EnhancedTableBody";


type CommonTable = {
    headCells: Array<HeadCell>
    rows: Array<Array<string | number|ReactNode>>
    title: string
}

//универсальная таблица ждет название, массив из масивов в которых строки или
// числа и массив обьектов для шапки таблицы:
export const CommonTable: FC<CommonTable> = memo(({rows, headCells, title}) => {

        return (
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2}}>
                    <TableContainer>
                        <Table sx={{minWidth: 750}} aria-labelledby="tableTitle">
                            <EnhancedTableHead headCells={headCells}/>
                            <EnhancedTableBody rows={rows}/>
                        </Table>
                    </TableContainer>
                    {rows.length === 0 && <> o сurva! no cards?</>}

                    <TablePagination
                        rowsPerPageOptions={[-1]}
                        component="div"
                        count={-1}
                        rowsPerPage={-1}
                        page={1}
                        onPageChange={() => {
                        }}
                        onRowsPerPageChange={() => {
                        }}
                    />
                </Paper>
            </Box>
        )
    }
)

