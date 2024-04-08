import {Box} from "@mui/material";
import {Controller} from "react-hook-form";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import {ValidationError} from "../validationError/ValidationError";
import {useTranslation} from "react-i18next";
import CustomSelect from "../forms/theme-elements/CustomSelect";

type FormInput = {
    control: any;
    name: string;
    watch?: any;
    placeholder: string;
    error?: any;
    rules?: any;
    isError?: boolean;
    options: any[];
    onSelect?: (value: any, e?: any) => void;
};
export const FormSelectComponent = ({
                                        name,
                                        control,
                                        placeholder,
                                        isError,
                                        rules,
                                        error,
                                        options,
                                        onSelect,
                                    }: FormInput) => {
    const {t} = useTranslation();
    return (
        <Box>
            <Controller
                name={name}
                control={control}
                defaultValue=""
                render={({field: {onChange, value, onBlur}}) => (
                    <CustomSelect
                        noOptionsText={t("noOptions")}
                        value={value}
                        inputValue={value}
                        clearIcon={null}
                        onInputChange={(event: any, newInputValue: any) => {
                            onChange(event);
                            onSelect && onSelect(newInputValue, event);
                        }}
                        id={name}
                        options={options}
                        onBlur={onBlur}
                        fullWidth
                        isOptionEqualToValue={(option: any, value: any) => {
                            if (!value) {
                                return false;
                            }
                            if (typeof value === "string") {
                                return option === value;
                            }
                            return option.id === value.id;
                        }}
                        renderInput={(params: any) => (
                            <CustomTextField
                                {...params}
                                placeholder={placeholder}
                                aria-label="Controllable"
                                error={isError}
                            />
                        )}
                    />
                )}

                rules={{
                    ...rules,
                    validate: (value: any) => {
                        if (typeof options[0] === "string") {
                            console.log("options", options);
                            console.log("value", value);
                            if (!options.includes(value)) return t("invalidSelection");
                            return true;
                        }
                        if (!options.map((x) => x.label).includes(value))
                            return t("invalidSelection");
                        return true;
                    },
                }}
            />
            {error && <ValidationError error={error?.message || t("invalid")}/>}
        </Box>
    );
};
