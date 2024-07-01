import { fetchData } from "../api/fetchData";
import { taskApi } from "../api/taskApi";

export const createTask = async (taskData) => {
    try {
        return await fetchData(taskApi.createTask, 'POST', taskData)
    } catch(error) {
        throw new Error;
    }
}

export const getTaskById = async (taskId) => {
    try {
        return await fetchData(taskApi.getTaskById(taskId), 'GET')
    } catch(error) {
        throw new Error;
    }
}

export const getTasks = async () => {
    try {
        return await fetchData(taskApi.getTasks, 'GET')
    } catch(error) {
        throw new Error;
    }
}

export const updateTask = async (taskId, taskData) => {
    try {
        return await fetchData(taskApi.updateTask(taskId), 'PUT', taskData)
    } catch(error) {
        throw new Error;
    }
}

