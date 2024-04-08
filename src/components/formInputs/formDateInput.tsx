import {Box} from "@mui/material";
import {Controller} from "react-hook-form";
import {ValidationError} from "../validationError/ValidationError";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import CustomTextField from "../CustomTextField";

type FormDate = {
    control: any;
    name: string;
    watch?: any;
    placeholder: string;
    error?: any;
    rules?: any;
    isError?: boolean;
    disabled?: boolean;
    minDate?: Date | string | null;
    maxDate?: Date | null;
    onChangeFn?: (e: any) => void;
};
export const FormDateComponent = ({
                                      name,
                                      control,
                                      rules,
                                      error,
                                      disabled,
                                      onChangeFn,
                                      minDate = null,
                                      maxDate = null,
                                  }: FormDate) => {
    return (
        <Box>
            <Controller
                name={name}
                control={control}
                defaultValue=""
                render={({field: {onChange, value}}) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            disabled={disabled}
                            inputFormat={"DD-MM-YYYY"}
                            onChange={(e: any) => {
                                onChange(e);
                                if (onChangeFn) {
                                    onChangeFn(e);
                                }
                            }}
                            minDate={minDate}
                            maxDate={maxDate}
                            value={value}
                            renderInput={(params: any) => (
                                <CustomTextField {...params} error={error} fullWidth/>
                            )}
                        />
                    </LocalizationProvider>
                )}
                rules={rules}
            />
            {error && <ValidationError error={error?.message || "Invalid"}/>}
        </Box>
    );
};
