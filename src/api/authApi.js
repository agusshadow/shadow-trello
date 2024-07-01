const baseUrl = 'http://localhost:2024';

export const authApi = {
    register: `${baseUrl}/users`,
    login: `${baseUrl}/users/login`,
    logout: `${baseUrl}/users/logout`,
}