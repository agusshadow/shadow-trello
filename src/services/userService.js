import { fetchData } from "../api/fetchData";
import { userApi } from "../api/userApi";

export const getUserById = async (id) => {
    try {
        return await fetchData(userApi.getUserById(id), 'GET')
    } catch(error) {
        throw new Error;
    }
}
