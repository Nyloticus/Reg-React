import {Box, Chip, Link, TableRow} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";

type pledgesTableRowsProps = {
    row: any
    onRowClick?: (row: any) => void
    onActionClick?: (id: string, activate: boolean) => void
}

export const UsersTableRows = ({row, onRowClick, onActionClick}: pledgesTableRowsProps) => {

    return (
        <TableRow hover tabIndex={-1}>
            <TableCell onClick={() => (onRowClick ? onRowClick(row) : {})}>
                <Typography variant="body1" sx={{fontWeight: 'bold'}}>
                    {row?.name || "-"}
                </Typography>
            </TableCell>
            <TableCell onClick={() => (onRowClick ? onRowClick(row) : {})}>
                <Link variant={'body1'} sx={{fontWeight: 'bold', textDecoration: 'none'}} href={`mailto:${row.email}`}>
                    {row?.email || "-"}
                </Link>
            </TableCell>
            <TableCell
                onClick={() => (onRowClick ? onRowClick(row) : {})}
            >
                <Chip
                    sx={{
                        borderRadius: "6px",
                        backgroundColor: (theme) => row.active ? theme.palette.success.light : theme.palette.error.light,
                        color:  "#fff" ,
                    }}
                    size="small"
                    label={row.active ? "Active" : "Inactive"}
                />
            </TableCell>
            <TableCell>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2
                }}>

                    {!row.active && <Typography variant={"body1"} sx={{
                        color: (theme) => theme.palette.success.main,
                        fontWeight: "bold",
                        cursor: 'pointer'
                    }}
                                                onClick={() => {
                                                    onActionClick && onActionClick(row.id, true)
                                                }}>
                        Activate
                    </Typography>}
                    {row.active && <Typography variant={"body1"} sx={{
                        color: (theme) => theme.palette.warning.main,
                        fontWeight: "bold",
                        cursor: 'pointer'
                    }}
                                               onClick={() => {
                                                   onActionClick && onActionClick(row.id,false)
                                               }}>
                        Deactivate
                    </Typography>}
                </Box>
            </TableCell>

        </TableRow>
    )
}