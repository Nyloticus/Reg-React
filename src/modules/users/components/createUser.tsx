import {Box, Button, Grid, Typography} from "@mui/material";
import PasswordInput from "../../../components/formInputComponent/FormPasswordInput";
import {FormDropDownComponent} from "../../../components/formInputComponent/formDropDownInput";
import {FormInputComponent} from "../../../components/formInputComponent/formInputComponent";
import CustomFormLabel from "../../../components/CustomFormLabel";
import {validationRules} from "../../../utils/validationRules/ValidationRules";
import {useForm} from "react-hook-form";
import {Address, ICreateBody} from "../../../services/usersAPI/CreateUser.ts";
import useGetGovs from "../hooks/useGetGovs.tsx";
import useGetCities from "../hooks/useGetCities.tsx";
import Spinner from "../../../components/spinner/Spinner.tsx";
import {FormDateComponent} from "../../../components/formInputs/formDateInput.tsx";
import useCreateUser from "../hooks/useCreateUser.tsx";
import {Card} from "../../../components/shared/Cards.tsx";
import dayjs from "dayjs";
import {useEffect} from "react";
import {AppState, dispatch, useSelector} from "../../../store/Store.tsx";
import {setCloseAlert, setOpenAlert} from "../../../store/common/commonSlice.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router";
import ResponseMessage from "../../../components/responseMessage/ResponseMessage.tsx";


const UserForm = () => {
    const {
        control,
        handleSubmit,
        formState: {errors,},

    } = useForm<ICreateBody>({
        shouldFocusError: true,
    });
    const {Govs, isGovsLoading} = useGetGovs()
    const {Cities, isCitiesLoading} = useGetCities()
    const {CreateUser, isCreateUserSuccess, isCreateUserLoading, isError, CreateUserError} = useCreateUser()
    const {alertState} = useSelector((state: AppState) => state.common);
    const query = useQueryClient();
    const navigate = useNavigate()
    const onSubmit = (data: ICreateBody) => {
        const addressList = [{
            governateId: data.governateId,
            cityId: data.cityId,
            street: data.street,
            buildNo: data.buildNo,
            flatNo: data.flatNo,
        }, {
            governateId: data.additionalGovernateId,
            cityId: data.additionalCityId,
            street: data.additionalStreet,
            buildNo: data.additionalBuildNo,
            flatNo: data.additionalFlatNo,
        }]
        const body: ICreateBody = {
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            password: data.password,
            email: data.email,
            birthDate: dayjs(data.birthDate).format('YYYY-MM-DDTHH:mm:ss'),
            mobileNumber: data.mobileNumber,
            addressList: addressList as Address[]
        }
        CreateUser(body);
    }
    useEffect(() => {
        if (isCreateUserSuccess) {
            query.invalidateQueries(['getUsers']).then(() => {
                dispatch(setOpenAlert({type: 'success', message: "User has been created successfully"}))
                setTimeout(() => {
                    dispatch(setCloseAlert())
                    navigate('/')
                }, 2000)
            })
        }

    }, [isCreateUserSuccess]);
    useEffect(() => {
        if (isError) {
            console.log(CreateUserError)
            dispatch(setOpenAlert({
                type: 'error',
                message: CreateUserError?.message?.errors?.join(', ') || CreateUserError?.response?.data?.errorMessage || "error"
            }))
        }
    }, [isError]);
    return (
        <>
            {isCitiesLoading || isGovsLoading ?
                <Spinner/> :
                <Box sx={{
                    px: 20,
                    pt: 4,
                }}>
                    <Card
                        sx={{
                            p: 3,
                            height: "calc(100vh - 80px)",
                            overflow: 'auto',
                            "&::-webkit-scrollbar": {
                                width: "0.4em",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "primary.main",
                            },
                            "&::-webkit-scrollbar-track": {
                                backgroundColor: "transparent",
                            },
                        }}>
                        {alertState.open && <ResponseMessage
                            message={alertState.message || 'success'}
                            type={alertState.type}/>}
                        <Typography variant='h4'>Create User</Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item md={4} xs={12} mt={2}>
                                    <CustomFormLabel htmlFor='firstName'>First name</CustomFormLabel>
                                    <FormInputComponent
                                        control={control}
                                        name={"firstName"}
                                        placeholder={"Enter your first name"}
                                        isError={!!errors.firstName}
                                        error={errors.firstName}
                                        rules={{
                                            required: "required",
                                        }}
                                        maxLength={20}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12} mt={2}>
                                    <CustomFormLabel htmlFor='middleName'>Middle name</CustomFormLabel>
                                    <FormInputComponent
                                        control={control}
                                        name={"middleName"}
                                        placeholder={"Enter your middle name"}
                                        isError={!!errors.middleName}
                                        error={errors.middleName}
                                        rules={{
                                            required: "required",
                                        }}
                                        maxLength={40}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12} mt={2}>
                                    <CustomFormLabel htmlFor='lastName'>Last name</CustomFormLabel>
                                    <FormInputComponent
                                        control={control}
                                        name={"lastName"}
                                        placeholder={"Enter your last name"}
                                        isError={!!errors.lastName}
                                        error={errors.lastName}
                                        rules={{
                                            required: "required",
                                        }}
                                        maxLength={20}
                                    />
                                </Grid>
                            </Grid>
                            <Box mt={2}>
                                <CustomFormLabel htmlFor='email'>Email</CustomFormLabel>
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
                                            message: "Invalid Email",
                                        },
                                    }}
                                />
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12} mt={2}>
                                    <CustomFormLabel htmlFor='birthDate'>Birth Date</CustomFormLabel>
                                    <FormDateComponent
                                        control={control}
                                        name={"birthDate"}
                                        placeholder={"birthDate"}
                                        isError={!!errors.birthDate}
                                        error={errors.birthDate}
                                        rules={{
                                            required: "required",
                                        }}
                                        maxDate={dayjs().subtract(20, 'year').toDate()}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12} mt={2}>
                                    <CustomFormLabel htmlFor='mobileNumber'>Mobile number</CustomFormLabel>
                                    <FormInputComponent
                                        control={control}
                                        name={"mobileNumber"}
                                        placeholder={"mobileNumber"}
                                        isError={!!errors.mobileNumber}
                                        error={errors.mobileNumber}
                                        rules={{
                                            required: "required",
                                            pattern: validationRules.mobile
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Box>
                                <PasswordInput
                                    placeholder={"password"}
                                    label={"Password"}
                                    id='password'
                                    control={control}
                                    errors={errors}
                                    rules={
                                        {
                                            required: "required",
                                            validate: (value: string) => {
                                                if (value.length < 8) return "Password must be at least 8 characters";
                                            },
                                        }
                                    }
                                />
                            </Box>
                            <Box sx={{
                                my: 2
                            }}>
                                <Typography variant='h6'>Address #1</Typography>
                                <Grid container spacing={2} px={2} mb={2}>
                                    <Grid item md={6} xs={12}>
                                        <CustomFormLabel htmlFor='governateId'>Governate</CustomFormLabel>
                                        <FormDropDownComponent
                                            options={Govs}
                                            control={control}
                                            name={"governateId"}
                                            placeholder={"Select Governate"}
                                            isError={!!errors.governateId}
                                            error={errors.governateId}
                                            rules={{
                                                required: "required",
                                            }}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <CustomFormLabel htmlFor='governateId'>Cities</CustomFormLabel>
                                        <FormDropDownComponent
                                            options={Cities}
                                            control={control}
                                            name={"cityId"}
                                            placeholder={"Select City"}
                                            isError={!!errors.cityId}
                                            error={errors.cityId}
                                            rules={{
                                                required: "required",
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} px={2}>
                                    <Grid item md={4} xs={12}>
                                        <CustomFormLabel htmlFor='street'>Street</CustomFormLabel>
                                        <FormInputComponent
                                            control={control}
                                            name={"street"}
                                            placeholder={"street"}
                                            isError={!!errors.street}
                                            error={errors.street}
                                            rules={{
                                                required: "required",
                                            }}
                                            maxLength={200}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12}>
                                        <CustomFormLabel htmlFor='buildNo'>Building No.</CustomFormLabel>
                                        <FormInputComponent
                                            control={control}
                                            name={"buildNo"}
                                            placeholder={"buildNo"}
                                            isError={!!errors.buildNo}
                                            error={errors.buildNo}
                                            rules={{
                                                required: "required",
                                            }}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12}>
                                        <CustomFormLabel htmlFor='flatNo'>Flat No.</CustomFormLabel>
                                        <FormInputComponent
                                            control={control}
                                            name={"flatNo"}
                                            placeholder={"flatNo"}
                                            isError={!!errors.flatNo}
                                            error={errors.flatNo}
                                            rules={{
                                                required: "required",
                                                pattern: {
                                                    value: validationRules.numbersOnly,
                                                    message: "Invalid Number",
                                                }
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{
                                mb: 2
                            }}>
                                <Typography variant='h6'>Address #2</Typography>
                                <Grid container spacing={2} mb={2} px={2}>
                                    <Grid item md={6} xs={12}>
                                        <CustomFormLabel htmlFor='governateId'>Governate</CustomFormLabel>
                                        <FormDropDownComponent
                                            options={Govs}
                                            control={control}
                                            name={"additionalGovernateId"}
                                            placeholder={"Select Governate"}
                                            isError={!!errors.additionalGovernateId}
                                            error={errors.additionalGovernateId}
                                            rules={{
                                                required: "required",
                                            }}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <CustomFormLabel htmlFor='additionalCityId'>Cities</CustomFormLabel>
                                        <FormDropDownComponent
                                            options={Cities}
                                            control={control}
                                            name={"additionalCityId"}
                                            placeholder={"Select City"}
                                            isError={!!errors.additionalCityId}
                                            error={errors.additionalCityId}
                                            rules={{
                                                required: "required",
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} px={2}>
                                    <Grid item md={4} xs={12}>
                                        <CustomFormLabel htmlFor='additionalStreet'>Street</CustomFormLabel>
                                        <FormInputComponent
                                            control={control}
                                            name={"additionalStreet"}
                                            placeholder={"additionalStreet"}
                                            isError={!!errors.additionalStreet}
                                            error={errors.additionalStreet}
                                            rules={{
                                                required: "required",
                                            }}
                                            maxLength={200}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12}>
                                        <CustomFormLabel htmlFor='additionalBuildNo'>Building No.</CustomFormLabel>
                                        <FormInputComponent
                                            control={control}
                                            name={"additionalBuildNo"}
                                            placeholder={"additionalBuildNo"}
                                            isError={!!errors.additionalBuildNo}
                                            error={errors.additionalBuildNo}
                                            rules={{
                                                required: "required",
                                            }}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12}>
                                        <CustomFormLabel htmlFor='additionalFlatNo'>Flat No.</CustomFormLabel>
                                        <FormInputComponent
                                            control={control}
                                            name={"additionalFlatNo"}
                                            placeholder={"additionalFlatNo"}
                                            isError={!!errors.additionalFlatNo}
                                            error={errors.additionalFlatNo}
                                            rules={{
                                                required: "required",
                                                pattern: {
                                                    value: validationRules.numbersOnly,
                                                    message: "Invalid Number",
                                                }
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box
                                sx={{
                                    mt: 2,
                                }}
                            >
                                <Button variant='contained' type='submit' disabled={isCreateUserLoading}>
                                    Submit
                                </Button>
                            </Box>
                        </form>
                    </Card>
                </Box>
            }
        </>
    );
};
export default UserForm;
