const baseUrl = 'http://localhost:2024';

export const taskApi = {
    createTask: `${baseUrl}/tasks`,
    getTasks: `${baseUrl}/tasks`,
    getTaskById: (id) => `${baseUrl}/tasks/${id}`,
    updateTask: (id) => `${baseUrl}/tasks/${id}`
}