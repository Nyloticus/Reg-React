import axios, {AxiosError} from "axios";
import {Endpoints} from "../../utils/APIConfig";

export type Address = {
    governateId?: string,
    cityId?: string,
    street?: string,
    buildNo?: string,
    flatNo?: number
    additionalGovernateId?: string
    additionalCityId?: string
    additionalStreet?: string
    additionalBuildNo?: string
    additionalFlatNo?: number
}

export type ICreateBody = {
    firstName: string,
    middleName: string,
    lastName: string,
    password: string,
    email: string,
    birthDate: string,
    mobileNumber: string,
    addressList: Address[]
}&Address
export const CreateUserAPI = async (body: ICreateBody,token:string) => {
    const res = await axios.post(
        Endpoints.users.createUser,
        body,
        {
            headers: {
                "Authorization": `bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
    if (!res.data.isSuccess) throw new AxiosError(res.data, res.data.code);
    return (
        res
    );
};