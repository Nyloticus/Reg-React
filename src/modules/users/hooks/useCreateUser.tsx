import {useMutation} from "@tanstack/react-query";
import {getCurrUser} from "../../../services/auhtAPI/loginAPI.ts";
import {CreateUserAPI, ICreateBody} from "../../../services/usersAPI/CreateUser.ts";

type CreateUserReturnType = {
    CreateUser: (body: ICreateBody) => void;
    isCreateUserLoading: boolean;
    isError: boolean;
    CreateUserError: any;
    isCreateUserSuccess: boolean;
    data: any;
};
const useCreateUser = (): CreateUserReturnType => {
    const user = getCurrUser();
    const {
        mutate: CreateUser,
        isLoading: isCreateUserLoading,
        error: CreateUserError,
        isError,
        isSuccess: isCreateUserSuccess,
        data,
    } = useMutation({
        mutationFn: (body: ICreateBody) => {
            return CreateUserAPI(body, user?.token);
        },
    });
    return {CreateUser, isCreateUserLoading, isError, CreateUserError, isCreateUserSuccess, data};
};

export default useCreateUser;
