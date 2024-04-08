import axios, {AxiosError} from "axios";
import {Endpoints} from "../../utils/APIConfig";

export interface ILoginBody {
    username: string;
    password: string;
}

export const loginAPI = async (body: ILoginBody) => {
    const res = await axios.post(
        Endpoints.login,
        body,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    if (!res.data.isSuccess) throw new AxiosError(res.data.message, res.data.code);
    return (
        res
    );
};
export const getCurrUser = () => {
    const data = JSON.parse(localStorage.getItem("auth-data") || "{}");
    if (
        !data ||
        !data.token ||
        !data.refreshToken
    ) {
        localStorage.removeItem("auth-data");
        return null;
    }
    return data;
};
