import { fetchData } from "../api/fetchData";
import { authApi } from "../api/authApi";

export const login = async (userCredentials) => {
    try {
        const response = await fetchData(authApi.login, 'POST', userCredentials)
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_id', response.user_id);
    } catch(error) {
        throw new Error;
    }
}

export const logout = async (userCredentials) => {
    try {
        await fetchData(authApi.logout, 'POST', userCredentials)
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
    } catch(error) {
        throw new Error;
    }
}

export const register = async (userData) => {
    try {
        await fetchData(authApi.register, 'POST', userData);
        await login({
            email: userData.email,
            password: userData.password
        });
    } catch(error) {
        throw new Error;
    }
}