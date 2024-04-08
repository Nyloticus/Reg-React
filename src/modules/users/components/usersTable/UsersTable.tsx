import {
    Table,
    TableBody,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import {UsersTableRows} from "./UsersTableRows.tsx";
import {UsersTableHead} from "./UsersTableHead.tsx";
import {NotFound} from "../../../../components/notfound/NotFound.tsx";


type UsersTable = {
    rows: any[];
    onRowClick?: (row: any) => void;
    onActionClick?: (id: string, activate: boolean) => void
};
export const UsersTable = ({
                               rows,
                               onRowClick,
                               onActionClick,
                           }: UsersTable) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const visibleRows = rows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );
    return (
        <TableContainer sx={{overflowX: "auto", boxShadow: "0"}}>
            <Table
                sx={{
                    whiteSpace: "nowrap",
                    width: "100%",
                    overflowX: "auto",
                    backgroundColor: 'background.paper',
                }}
                aria-labelledby="tableTitle"
            >
                <TableHead
                    sx={{
                        border: "1px solid",
                        borderColor: (theme) => theme.palette.grey[300],
                    }}
                >
                    <TableRow>
                        <UsersTableHead />
                    </TableRow>
                </TableHead>
                <TableBody
                    sx={{
                        border: "1px solid",
                        borderColor: (theme) => theme.palette.grey[300],
                    }}
                >
                    {visibleRows.length > 0 ? (
                        visibleRows.map((row: any, index: number) => (
                            <UsersTableRows row={row} key={index} onRowClick={onRowClick}
                                            onActionClick={onActionClick}/>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell align="center" colSpan={6}>
                                <NotFound/>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage={"Rows per page"}
                            labelDisplayedRows={({from, to, count}) =>
                                `${from}-${to} Of ${count}`
                            }
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
        ;
};
