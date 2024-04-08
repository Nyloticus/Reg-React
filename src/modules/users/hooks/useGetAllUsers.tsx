import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Endpoints} from "../../../utils/APIConfig.ts";
import {getCurrUser} from "../../../services/auhtAPI/loginAPI.ts";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {dispatch} from "../../../store/Store.tsx";
import {NavigateFunction} from "react-router-dom";
import {setLogoutUserData} from "../../../store/auth/authSlice.tsx";


export function handleNotAuthorized(error: unknown, remove: () => void, navigate: NavigateFunction) {
    // @ts-ignore
    if (error?.response?.status === 401) {
        localStorage.removeItem("auth-data");
        remove();
        dispatch(setLogoutUserData());
        navigate("/login");
    }
}

const useAllUsers = () => {
    const user = getCurrUser();
    const navigate = useNavigate();
    const {
        data,
        isLoading: isUsersLoading,
        isFetching,
        isSuccess,
        error,
        refetch,
        remove,
    } = useQuery({
        queryKey: ["getUsers"],
        queryFn: () => {
            return axios.get(Endpoints.users.getAll, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${user?.token}`,
                },
            });
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 1,
    });
    useEffect(() => {
        handleNotAuthorized(error, remove, navigate);
    }, [error, navigate, remove]);
    return {
        data: data?.data?.payload.map((item: any) => {
                return {
                    ...item,
                    id: item.id,
                    name: `${item?.firstName||"-"} ${item?.middleName||"-"} ${item?.lastName||"-"}`,
                }
            }) ||
            [],
        isLoading:
        isUsersLoading,
        isFetching,
        isSuccess,
        error,
        refetch,
    }
        ;
};

export default useAllUsers;
