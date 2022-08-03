import * as React from 'react';
import {alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import {visuallyHidden} from '@mui/utils';
import {CardPacksEntityWithDeckCover} from "../../DAL/API-CardsPack";
import {useDispatchApp, useSelectorApp} from "../../CustomHooks/CustomHooks";
import {thunksPack} from "./PackReducer";
import {actionsCards} from "../cardsList/CardsReducer";
import {useNavigate} from "react-router-dom";
import {Path} from "../Routes";


interface Data {
    "_id": string,
    "user_id": string,
    "user_name": string,
    "private": boolean,
    "name": string,
    "path": string,
    "grade": number,
    "shots": number,
    "cardsCount": number,
    "type": string,
    "rating": number,
    "created": string,
    "updated": string,
    "more_id": string,
    "__v": number
}

type Order = 'asc' | 'desc';

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'cardsCount',
        numeric: true,
        disablePadding: false,
        label: 'Cards',
    },
    {
        id: 'updated',
        numeric: true,
        disablePadding: false,
        label: 'Last Updated',
    },
    {
        id: 'created',
        numeric: true,
        disablePadding: false,
        label: 'Created by',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {order, orderBy, rowCount, onRequestSort} =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    const dispatch = useDispatchApp()

    const sortHandler = (nameColumn: any, order: string) => {
        if (nameColumn === 'updated') {
            return order === 'desc' ? '1updated' : '0updated'
        }
        if (nameColumn === 'name') {
            return order === 'desc' ? '1name' : '0name'
        }
        if (nameColumn === 'cardsCount') {
            return order === 'desc' ? '1cardsCount' : '0cardsCount'
        }
        if (nameColumn === 'created') {
            return order === 'desc' ? '1created' : '0created'
        } else return ''
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="normal">
                    Action
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        onClick={() => dispatch(thunksPack.sortPack(sortHandler(headCell.id, order)))}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const {numSelected} = props;

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >

            <Typography
                sx={{flex: '1 1 100%'}}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                PacksList
            </Typography>


            <Tooltip title="Filter list">
                <IconButton>
                    <FilterListIcon/>
                </IconButton>
            </Tooltip>

        </Toolbar>
    );
};

type TablePacksPropsType = {
    rows: CardPacksEntityWithDeckCover[]
}

export function TablePacks(props: TablePacksPropsType) {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>("created");
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const dispatch = useDispatchApp()
    const myUserId = useSelectorApp(state => state.auth._id)
    const navigate = useNavigate()

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

    const deletePackHandler = (packId: string) => {
        dispatch(thunksPack.deletePack(packId))
    }

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <EnhancedTableToolbar numSelected={selected.length}/>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={props.rows.length}
                        />
                        <TableBody>

                            {props.rows
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    const moveOnCardList = () => {
                                        dispatch(actionsCards.setQueryParams({cardsPack_id: row._id}))
                                        dispatch(actionsCards.getTitle(row.name))
                                        navigate(Path.cardList)
                                    }

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row._id}
                                        >
                                            <TableCell align="left">
                                                {myUserId === row.user_id && <Tooltip title="Delete pack">
                                                    <IconButton onClick={() => deletePackHandler(row._id)}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </Tooltip>}
                                            </TableCell>
                                            <TableCell
                                                onClick={moveOnCardList}
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.cardsCount}</TableCell>
                                            <TableCell align="right">{row.updated}</TableCell>
                                            <TableCell align="right">{row.created}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense}/>}
                label="Dense padding"
            />
        </Box>
    );
}
