import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Endpoints} from "../../../utils/APIConfig.ts";
import {getCurrUser} from "../../../services/auhtAPI/loginAPI.ts";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {handleNotAuthorized} from "./useGetAllUsers.tsx";

const useAllGovs = () => {
    const user = getCurrUser();
    const navigate = useNavigate();
    const {
        data,
        isLoading: isGovsLoading,
        isFetching,
        isSuccess,
        error,
        refetch,
        remove,
    } = useQuery({
        queryKey: ["getGovs"],
        queryFn: () => {
            return axios.get(Endpoints.users.lookup.getGovs, {
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
        Govs: data?.data?.payload.map((item: any) => {
                return {
                    label: item.nameEn,
                    value: item.id
                }
            }) ||
            [],
        isGovsLoading,
        isFetching,
        isSuccess,
        error,
        refetch,
    }
        ;
};

export default useAllGovs;
