import {Alert, Box} from "@mui/material";

export default function ResponseMessage({message, type}: { message: any, type: any }) {
    if (message)
        return (
            <Box my={"1rem"}>
                <Alert severity={type}>
                    {message}
                </Alert>
            </Box>
        );
    return null;
}
