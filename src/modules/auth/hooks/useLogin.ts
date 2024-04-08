import {useMutation} from "@tanstack/react-query";
import {ILoginBody, loginAPI} from "../../../services/auhtAPI/loginAPI.ts";

const useLogin = (): any => {
    const {
        mutate: login,
        isLoading,
        error: loginError,
        isError,
        isSuccess,
        data,
    } = useMutation({
        mutationFn: (body: ILoginBody) => {
            return loginAPI(body);
        },
    });
    const user = data?.data?.payload;
    return {login, isLoading, isError, loginError, isSuccess, user};
};

export default useLogin;
