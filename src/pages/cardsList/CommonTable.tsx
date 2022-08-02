import * as React from "react";
import {FC, memo} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {EnhancedTableToolbar} from "./EnhancedTableToolbar";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import {EnhancedTableHead} from "./EnhancedTableHead";
import TablePagination from "@mui/material/TablePagination";
import {HeadCell} from "./TableCards";
import {EnhancedTableBody} from "./EnhancedTableBody";

type CommonTable = {
    headCells: Array<HeadCell>
    rows: Array<Array<string | number>>
    title: string
}
export const CommonTable: FC<CommonTable> = memo(({rows, headCells, title}) => {


        return (
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2}}>

                    <EnhancedTableToolbar title={title}/>

                    <TableContainer>
                        <Table sx={{minWidth: 750}} aria-labelledby="tableTitle">
                            <EnhancedTableHead headCells={headCells}/>
                            <EnhancedTableBody rows={rows}/>
                        </Table>
                    </TableContainer>

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

