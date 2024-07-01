import { fetchData } from "../api/fetchData";
import { boardApi } from "../api/boardApi";

export const getBoards = async () => {
    try {
        return await fetchData(boardApi.getBoards, 'GET')
    } catch(error) {
        throw new Error;
    }
}

export const getBoardById = async (boardId) => {
    try {
        return await fetchData(boardApi.getBoardById(boardId), 'GET')
    } catch(error) {
        throw new Error;
    }
}


export const createBoard = async (boardData) => {
    try {
        return await fetchData(boardApi.createBoard, 'POST', boardData)
    } catch(error) {
        throw new Error;
    }
}

export const deleteBoard = async (boardId) => {
    try {
        return await fetchData(boardApi.deleteBoard(boardId), 'DELETE')
    } catch(error) {
        throw new Error;
    }
}