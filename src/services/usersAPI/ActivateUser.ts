import axios, {AxiosError} from "axios";
import {Endpoints} from "../../utils/APIConfig";

export type IActivateBody = {
    userId:string,
    activate: boolean
}
export const ActivateUserAPI = async (body: IActivateBody,token:string) => {
    const res = await axios.post(
        Endpoints.users.activateUser,
        body,
        {
            headers: {
                "Authorization": `bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
    if (!res.data.isSuccess) throw new AxiosError(res.data.message, res.data.code);
    return (
        res
    );
};