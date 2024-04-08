import {Controller} from "react-hook-form";
import CustomTextField from "../CustomTextField";
import {IconButton} from "@mui/material";
import {BackspaceOutlined} from "@mui/icons-material";
import {useEffect} from "react";
import searchIcon from "../../assets/images/svgs/search.svg";
import {validationRules} from "../../utils/validationRules/ValidationRules.ts";

interface SearchInputProps {
    name: string,
    control: any,
    watch: any,
    errors: any,
    reset?: any,
    withClear?: boolean,
    clearFunc?: any
    fullWidth?: boolean
    placeholder?: any
    handleSearch?: any
    handleSubmit?: any
    required?: boolean
    clearErrors?: any
}

export const SearchInput = ({
                                name,
                                control,
                                watch,
                                errors,
                                reset,
                                withClear,
                                clearFunc,
                                fullWidth = true,
                                placeholder,
                                handleSearch,
                                handleSubmit,
                                clearErrors,
                                required = true
                            }: SearchInputProps) => {
    useEffect(() => {
        const keyDownHandler = (event: any) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (handleSubmit) handleSubmit()
            }
        };
        document.getElementById(name)?.addEventListener('keydown', keyDownHandler);
        return () => {
            document.getElementById(name)?.removeEventListener('keydown', keyDownHandler);
        };
    }, []);
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({field: {onChange, value, onBlur}}) => (
                <CustomTextField
                    id={name}
                    onChange={(e: any) => {
                        onChange(e)
                        if (handleSearch) handleSearch()
                    }}
                    value={value}
                    onBlur={() => {
                        if (clearErrors) clearErrors(name)
                        onBlur()
                    }}
                    variant="outlined"
                    InputProps={withClear ? watch(name) ? {
                        endAdornment:
                            <IconButton onClick={() => {
                                reset()
                                clearFunc && clearFunc()
                            }}>
                                <BackspaceOutlined/>
                            </IconButton>,
                        startAdornment:
                            <img src={searchIcon} width={20}
                                 alt={'search'}/>
                    } : {
                        startAdornment:
                            <img src={searchIcon} width={20}
                                 alt={'search'}/>
                    } : {
                        startAdornment:
                            <img src={searchIcon} width={20}
                                 alt={'search'}/>
                    }}
                    fullWidth={fullWidth}
                    placeholder={placeholder}
                    error={!!errors[name]}
                />
            )}
            rules={required ? {
                    required: 'required',
                    pattern: {
                        value: validationRules.noSpecialChars,
                        message:    "Invalid search",
                    },
                    validate: (value) => {
                        console.log(value)
                        if (value.length > 0 && validationRules.allSpaces.test(value)) {
                            return  "Invalid search"
                        }
                    }
                } :
                {
                    pattern: {
                        value: validationRules.noSpecialChars,
                        message:  "Invalid search",
                    },
                    validate: (value) => {
                        if (value.length > 0 && validationRules.allSpaces.test(value)) {
                            return  "Invalid search"
                        }
                    }
                }
            }
        />
    )
}