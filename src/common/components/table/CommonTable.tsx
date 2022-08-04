import * as React from "react";
import {FC, memo, ReactNode} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TablePagination from "@mui/material/TablePagination";
import {HeadCell, Row} from "../../../pages/cardsList/TableCards";
import {EnhancedTableHead} from "./EnhancedTableHead";
import {EnhancedTableBody} from "./EnhancedTableBody";
import {styled} from "@mui/material/styles";


type CommonTable = {
    headCells: Array<HeadCell>
    rows: Row[][]
    sortHandler:(headCell:HeadCell)=>void
}

//универсальная таблица ждет название, массив из масивов  и массив обьектов для шапки таблицы:
export const CommonTable: FC<CommonTable> = memo(({sortHandler,rows, headCells}) => {

        return (
            <Box>
                <Paper>
                    <TableContainer>
                        <Table  aria-labelledby="tableTitle">
                            <EnhancedTableHead sortHandler={sortHandler} headCells={headCells}/>
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


