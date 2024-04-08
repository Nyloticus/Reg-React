import {Box} from "@mui/material";
import {useState} from "react";
import {Controller} from "react-hook-form";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CustomFormLabel from "../CustomFormLabel.tsx";
import CustomTextField from "../CustomTextField.tsx";
import ErrorMessage from "../errorMessage/ErrorMessage.tsx";

export default function PasswordInput({id, control, rules, errors, label}: any) {
    const [isVisibile, setIsVisibile] = useState(false);
    return (
        <>
            <CustomFormLabel htmlFor={id} color={"textSecondary"}>
                {label}
            </CustomFormLabel>
            <Controller
                name={id}
                control={control}
                defaultValue=""
                render={({field: {onBlur, onChange, value}}) => (
                    <Box position="relative">
                        <CustomTextField
                            onChange={onChange}
                            onBlur={onBlur}
                            type={isVisibile ? "text" : "password"}
                            value={value}
                            id={id}
                            variant="outlined"
                            error={!!errors[id]}
                            fullWidth
                        ></CustomTextField>
                        <Box
                            onClick={() => setIsVisibile(!isVisibile)}
                            sx={{
                                cursor: "pointer",
                                position: "absolute",
                                top: "50%",
                                transform: "translate(0, -35%)",
                                right: "1rem",
                                color: "grey.300",
                            }}
                        >
                            {isVisibile ? (
                                <VisibilityOffOutlinedIcon/>
                            ) : (
                                <VisibilityOutlinedIcon/>
                            )}
                        </Box>
                    </Box>
                )}
                rules={rules}
            />
            {errors[id] && (
                <Box display={"flex"} alignItems={"start"}>
                    <ErrorOutlineOutlinedIcon
                        fontSize="small"
                        sx={{
                            color: "error.main",
                            marginTop: "5px",
                            marginRight: "4px",
                        }}
                    />
                    <ErrorMessage mt={0.5}>{errors[id].message}</ErrorMessage>
                </Box>
            )}
        </>
    );
}
