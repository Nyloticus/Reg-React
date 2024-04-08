import {useMutation} from "@tanstack/react-query";
import {getCurrUser} from "../../../services/auhtAPI/loginAPI.ts";
import {ActivateUserAPI, IActivateBody} from "../../../services/usersAPI/ActivateUser.ts";

type ActivateUserReturnType = {
    ActivateUser: (body: IActivateBody) => void;
    isActivateUserLoading: boolean;
    isError: boolean;
    ActivateUserError: any;
    isActivateUserSuccess: boolean;
    data: any;
};
const useActivateUser = (): ActivateUserReturnType => {
    const user = getCurrUser();
    const {
        mutate: ActivateUser,
        isLoading: isActivateUserLoading,
        error: ActivateUserError,
        isError,
        isSuccess: isActivateUserSuccess,
        data,
    } = useMutation({
        mutationFn: (body: IActivateBody) => {
            return ActivateUserAPI(body, user?.token);
        },
    });
    return {ActivateUser, isActivateUserLoading, isError, ActivateUserError, isActivateUserSuccess, data};
};

export default useActivateUser;
