import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";

export type HeadProps = {
    userTypes: string[];
    handleFilter: (value: string) => void;
};

export const UsersTableHead = () => {
    return (
        <>
            <TableCell>
                <Typography
                    variant="body1"
                    sx={{
                        color: (theme) => theme.palette.grey[600],
                        fontWeight: "bold",
                    }}
                >
                    Name
                </Typography>
            </TableCell>
            <TableCell>
                <Typography
                    variant="body1"
                    sx={{
                        color: (theme) => theme.palette.grey[600],
                        fontWeight: "bold",
                    }}
                >
                    Email
                </Typography>
            </TableCell>
            <TableCell>
                <Typography
                    variant="body1"
                    sx={{
                        color: (theme) => theme.palette.grey[600],
                        fontWeight: "bold",
                    }}
                >
                    Active
                </Typography>
            </TableCell>
            <TableCell>
                <Typography
                    variant="body1"
                    sx={{
                        color: (theme) => theme.palette.grey[600],
                        fontWeight: "bold",
                    }}
                >
                    Actions
                </Typography>
            </TableCell>

        </>
    )

}