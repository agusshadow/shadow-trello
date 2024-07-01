const baseUrl = 'http://localhost:2024';

export const userApi = {
    getUserById: (id) => `${baseUrl}/users/${id}`,
}