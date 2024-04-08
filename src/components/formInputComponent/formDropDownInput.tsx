import { Box, MenuItem, Select, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { ValidationError } from "../validationError/ValidationError";

type FormInput = {
    control: any;
    name: string;
    watch?: any;
    placeholder: string;
    error?: any;
    rules?: any;
    isError?: boolean;
    options: { label: string; value: string }[];
    onSelect?: (value: any, e?: any) => void;
    multiple?: boolean;
};
export const FormDropDownComponent = ({
                                          name,
                                          control,
                                          placeholder,
                                          isError,
                                          rules,
                                          error,
                                          options,
                                          onSelect,
                                          multiple = false,
                                      }: FormInput) => {
    return (
        <Box>
            <Controller
                name={name}
                control={control}
                defaultValue=''
                render={({ field: { onChange, value, onBlur } }) => (
                    <Select
                        multiple={multiple}
                        fullWidth
                        placeholder={placeholder}
                        error={isError}
                        value={value || []}
                        onChange={(e) => {
                            onChange(e);
                            onSelect && onSelect(e);
                        }}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        onBlur={onBlur}
                    >
                        {options.length > 0 ? (
                            options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))
                        ) : (
                            <Box
                                sx={{
                                    p: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    variant={"body1"}
                                    sx={{
                                        color: (theme) => theme.palette.grey[400],
                                    }}
                                >
                                    No Options
                                </Typography>
                            </Box>
                        )}
                    </Select>
                )}
                rules={{
                    ...rules,
                }}
            />
            {error && <ValidationError error={error?.message || "Invalid"} />}
        </Box>
    );
};
