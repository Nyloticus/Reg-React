import * as React from "react";
import {MenuItem, TableCell} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ArrowDropDown} from "@mui/icons-material";
import {TableMenu} from "./tableMenu.tsx";

type TableMenuCellProps = {
    menuOptions: string[];
    handleFilter: (value: string) => void;
    menu: string;
};

export const TableMenuCell = ({menuOptions, handleFilter, menu}: TableMenuCellProps) => {
    const [menuSelectedIndex, setMenuSelectedIndex] = React.useState(0);
    const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(menuAnchor);
    const handleClickListItem = (
        event: React.MouseEvent<HTMLElement>,
    ) => {
        setMenuAnchor(event.currentTarget);
    };
    const handleClose = () => {
        setMenuAnchor(null);
    };
    const handleMenuItemClick = (
        _event: React.MouseEvent<HTMLElement>,
        index: number,
    ) => {
        setMenuSelectedIndex(index);
        handleFilter(menuOptions[index]);
        setMenuAnchor(null);
    };
    return (
        <TableCell>
            <Typography
                variant="body1"
                onClick={(e) => handleClickListItem(e)}
                sx={{
                    display: "flex",
                    cursor: "pointer",
                    color: (theme) => theme.palette.grey[600],
                    fontWeight: "bold",
                }}
            >
                {menu}
                <ArrowDropDown/>
            </Typography>
            <TableMenu
                id="menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button2",
                }}
                anchorEl={menuAnchor}
                open={openMenu}
                onClose={() =>
                    handleClose()
                }
            >
                {menuOptions.map((option: any, index: number) => (
                    <MenuItem
                        key={option + index}
                        selected={index === menuSelectedIndex}
                        onClick={(event) =>
                            handleMenuItemClick(event, index)
                        }
                    >
                        {option}
                    </MenuItem>
                ))}
            </TableMenu>
        </TableCell>

    )
}