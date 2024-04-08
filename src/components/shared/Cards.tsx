import {Box, SxProps} from "@mui/material";
import React from "react";

export const Card = ({children, sx}: { children: React.JSX.Element[] | React.JSX.Element, sx?: SxProps }) => {
    return (
        <Box sx={{
            ...sx,
            width: '100%',
            backgroundColor: "background.paper",
            boxShadow: '0 1px 5px 0 rgba(0,0,0,0.1)',
            borderRadius: '8px'
        }}>
            {children}
        </Box>
    )
}