import CustomFormLabel from "../../../components/CustomFormLabel.tsx";
import {FormInputComponent} from "../../../components/formInputComponent/formInputComponent.tsx";
import {useForm} from "react-hook-form";
import {Box, Button, Typography} from "@mui/material";
import PasswordInput from "../../../components/formInputComponent/FormPasswordInput.tsx";
import ResponseMessage from "../../../components/responseMessage/ResponseMessage.tsx";
import useLogin from "../hooks/useLogin.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router";
import {dispatch} from "../../../store/Store.tsx";
import {setLoginUserData} from "../../../store/auth/authSlice.tsx";
import {validationRules} from "../../../utils/validationRules/ValidationRules.ts";
import { Link } from "react-router-dom";

export const LoginForm = () => {
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const {login, isSuccess, isLoading, user, isError, loginError} =
        useLogin();
    const navigate = useNavigate()
    const onSubmit = (data: any) => {
        login(data)
    }
    useEffect(() => {
        if (isSuccess) {
            localStorage.setItem("auth-data", JSON.stringify(user))
            navigate("/");
            dispatch(setLoginUserData(user))
        }
    }, [user]);

    useEffect(() => {
        console.log("loginError", loginError);
        console.log("iserror", isError);

    }, [loginError]);

    return (
        <div>
            {isError && <ResponseMessage
                message={loginError?.response?.data?.errors?.join(', ') || loginError?.response?.data?.errorMessage || "error"}
                type={"error"}/>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <CustomFormLabel htmlFor="text-conpwd">
                        {"email"}
                    </CustomFormLabel>
                    <FormInputComponent
                        control={control}
                        name={"email"}
                        placeholder={"email"}
                        isError={!!errors.email}
                        error={errors.email}
                        rules={{
                            required: "required",
                            pattern: {
                                value: validationRules.email,
                                message: "invalid email address",
                            },
                        }}
                    />
                </Box>
                <Box>
                    <PasswordInput
                        label={'password'}
                        id="password"
                        control={control}
                        errors={errors}
                        rules={{
                            required: `${"required"}`,
                        }}
                    />
                </Box>
                <Box sx={{
                    display:'flex',
                    justifyContent:"flex-end",
                    mt:2
                }}>

                    <Link to={'/auth/Create-user'} >
                        Register
                    </Link>
                </Box>
                <Box sx={{
                    mt: 2,
                    width: '100%'
                }}>
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
                        {"login"}
                    </Button>
                </Box>
            </form>
        </div>
    )
}