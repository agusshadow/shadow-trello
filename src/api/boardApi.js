const baseUrl = 'http://localhost:2024';

export const boardApi = {
    getBoards: `${baseUrl}/boards`,
    getBoardById: (id) => `${baseUrl}/boards/${id}`,
    createBoard: `${baseUrl}/boards`,
    deleteBoard: (id) => `${baseUrl}/boards/${id}`,
}