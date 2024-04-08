import {useMutation} from "@tanstack/react-query";
import {IRefreshTokenBody, RefreshTokenAPI} from "../../../services/auhtAPI/RefreshTokenAPI.ts";
import {getCurrUser} from "../../../services/auhtAPI/loginAPI.ts";
import {dispatch} from "../../../store/Store.tsx";
import {setLoginUserData} from "../../../store/authuser/authSlice.tsx";

const useRefreshToken = (): any => {
    const userData = getCurrUser();
    const {
        mutate: refreshToken,
        isLoading,
        error: refreshTokenError,
        isError,
        isSuccess,
        data,
    } = useMutation({
        mutationFn: () => {
            console.log(userData)
            const body: IRefreshTokenBody = {token: userData?.token, refreshToken: userData?.refreshToken}
            return RefreshTokenAPI(body);
        },
    });
    const user = data?.data?.payload;
    if (user) {
        localStorage.setItem("auth-data", JSON.stringify(user))
        dispatch(setLoginUserData(user))

    }
    return {refreshToken, isLoading, isError, refreshTokenError, isSuccess, user};
};

export default useRefreshToken;
