import axios, {AxiosError} from "axios";
import i18n from "i18next";
import {Endpoints} from "../../utils/APIConfig";

export interface IRefreshTokenBody {
    token: string;
    refreshToken: string;
}

export const RefreshTokenAPI = async (body: IRefreshTokenBody) => {
    const res = await axios.post(
        Endpoints.auth.refreshToken,
        body,
        {
            headers: {
                lang: `${i18n.language}`,
                Authorization: `bearer ${body.token}`,
                "Content-Type": "application/json",
            },
        }
    );
    if (!res.data.success) throw new AxiosError(res.data.message, res.data.code);
    return (
        res
    );
};