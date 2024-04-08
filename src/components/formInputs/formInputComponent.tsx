import {Box} from "@mui/material";
import {Controller} from "react-hook-form";
import {ValidationError} from "../validationError/ValidationError";
import CustomTextField from "../CustomTextField.tsx";

type FormInput = {
    control: any,
    name: string,
    watch?: any,
    placeholder: string,
    error?: any,
    rules?: any,
    isError?: boolean
    disabled?: boolean
    onChangeFn?: (e: any) => void
}
export const FormInputComponent = ({
                                       name,
                                       control,
                                       placeholder,
                                       isError,
                                       rules,
                                       error,
                                       disabled,
                                       onChangeFn,

                                   }: FormInput) => {
    return (
        <Box>
            <Controller
                name={name}
                control={control}
                defaultValue=""
                render={({field: {onChange, value, onBlur}}) => (
                    <CustomTextField

                        id={name}
                        onChange={(e: any) => {
                            onChange(e)
                            if (onChangeFn) {
                                onChangeFn(e)
                            }
                        }}
                        value={value}
                        onBlur={onBlur}
                        variant="outlined"
                        fullWidth
                        placeholder={placeholder}
                        error={isError}
                        disabled={disabled}
                    />
                )}
                rules={rules}
            />
            {
                error && <ValidationError error={error?.message || 'Invalid'}/>
            }
        </Box>
    )
}