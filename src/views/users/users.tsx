import {Box, Button, Typography} from "@mui/material";
import {SearchInput} from "../../components/searchInput/SearchInput.tsx";
import {useForm} from "react-hook-form";
import {Card} from "../../components/shared/Cards.tsx";
import useAllUsers from "../../modules/users/hooks/useGetAllUsers.tsx";
import Spinner from "../../components/spinner/Spinner.tsx";
import {useCallback, useEffect, useState} from "react";
import {UsersTable} from "../../modules/users/components/usersTable/UsersTable.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {ValidationError} from "../../components/validationError/ValidationError.tsx";
import {useNavigate} from "react-router";
import {AppState, dispatch, useSelector} from "../../store/Store.tsx";
import {setCloseAlert, setOpenAlert} from "../../store/common/commonSlice.tsx";
import ResponseMessage from "../../components/responseMessage/ResponseMessage.tsx";
import useActivateUser from "../../modules/users/hooks/useActivateUser.tsx";

const Users = () => {
    const {
        control,
        watch,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm<{ filter: string }>();
    const {data, isLoading, isSuccess, isFetching} = useAllUsers()
    const {ActivateUserError, ActivateUser, isActivateUserLoading, isActivateUserSuccess, isError} = useActivateUser()
    const [filteredData, setFilteredData] = useState(data || [])
    const query = useQueryClient();
    const navigate = useNavigate()
    const {alertState} = useSelector((state: AppState) => state.common);

    useEffect(() => {
        if (isSuccess)
            setFilteredData(data)
    }, [isSuccess, isFetching])
    useEffect(() => {
        dispatch(setCloseAlert())
    }, []);
    useEffect(() => {
        if (isActivateUserSuccess) {
            query.invalidateQueries(['getUsers']).then(() => {
                dispatch(setOpenAlert({type: 'success', message: "User has been activated/deactivated successfully"}))
                setTimeout(() => {
                    dispatch(setCloseAlert())
                }, 5000)
            })
        }
        if (isError) {
            dispatch(setOpenAlert({
                type: 'error',
                message: ActivateUserError?.response?.data?.errors?.join(', ') || ActivateUserError?.response?.data?.errorMessage || "error"
            }))
        }
    }, [isActivateUserSuccess, query, isError])

    const handleSearch = useCallback(() => {
        handleSubmit((values) => {
            if (values?.filter === '') {
                setFilteredData(data)
            }
            if (values?.filter) {
                const dataAfterSearch = data?.filter((item: {
                        name: string,
                        email: string,
                        active: string,
                        userType: string
                    }) =>
                        item.name.toLowerCase().includes(values?.filter.toLowerCase()) ||
                        item.email.toLowerCase().includes(values?.filter.toLowerCase())
                )
                setFilteredData(dataAfterSearch)
            }
        })()
    }, [data, handleSubmit])

    return (
        <>
            {
                isLoading || isActivateUserLoading ? <Spinner/> :
                    <Box sx={{
                        p: 3
                    }}>
                        <Typography variant="h3">
                            Find all users
                        </Typography>
                        <Card sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            mt: 2,
                            p: 3,
                        }}>
                            <Typography variant="h6" sx={{
                                mb: 1
                            }}>
                                What are you looking for?
                            </Typography>
                            <Box>
                                <SearchInput name={'filter'}
                                             control={control}
                                             watch={watch}
                                             errors={errors}
                                             reset={reset}
                                             withClear={true}
                                             placeholder={"Search for..."}
                                             handleSubmit={handleSearch}
                                             clearFunc={() => {
                                                 setFilteredData(data)
                                             }}
                                             required={false}
                                />
                                {errors?.filter && <ValidationError error={errors?.filter?.message || "invalid"}/>}
                            </Box>
                        </Card>
                        <Card sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            mt: 2,
                            p: 3,
                        }}>
                            {alertState.open && <ResponseMessage
                                message={alertState.message || 'bravo'}
                                type={alertState.type}/>}
                            <Typography variant="h6" sx={{
                                mb: 1
                            }}>
                                User summary
                            </Typography>
                            <Button variant={"contained"} onClick={() => navigate("/Create-user")}
                                    fullWidth={false}
                            sx={{
                                my:2,
                            }}
                            >
                                Create User
                            </Button>
                            <UsersTable rows={filteredData}
                                        onRowClick={(row) => navigate(`/users/profile/${row.id}`)}
                                        onActionClick={(id, activate) => ActivateUser({
                                            userId: id,
                                            activate: activate
                                        })}/>
                        </Card>


                    </Box>
            }

        </>
    )
}
export default Users;