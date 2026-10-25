import axios from "axios";
import {getToken} from "../../auth/AuthService.ts";
import type {TodoDto} from "../dto/TodoDto.ts";

axios.interceptors.request.use(
    function (config) {
        config.headers['Authorization'] = getToken();
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

const TODO_URL = 'http://localhost:8080/api/todos';

export const changeStatusCompletedApiCall =
    async (id:number):Promise<TodoDto> =>{
        const response =
            await axios.put(`${TODO_URL}/${id}`);
        if(response.status !== 200){
            throw new Error("Failed to update todo");
        }
        return response.data;
    }

export const newTodo =
    (todo:Omit<TodoDto, "isCompleted">)=>{
    return axios.post<TodoDto>(TODO_URL,todo);
}
export const deleteTodoApiCall =
    async (id:number) :Promise<void> =>{
        const response =
            await axios.delete(`${TODO_URL}/${id}`);
        if(response.status !== 200){
            throw new Error("Failed to delete todo");
        }
    }

export const createTodo =
    async (todo:Omit<TodoDto, "isCompleted">):Promise<TodoDto> =>{
        const response =
            await axios.post(TODO_URL, todo);
        if(response.status !== 200){
            throw new Error("Failed to create todo");
        }
        return response.data;
    }

export const fetchAllTodoApiCall =
    async ():Promise<TodoDto[]> =>{
    const response =
        await axios.get<TodoDto[]>(TODO_URL);
    if(response.status !== 200){
        throw new Error("Failed to fetch todos");
    }
        return response.data;
    }


export const getAllTodoApiCall = () =>
    axios.get<TodoDto[]>(TODO_URL);


