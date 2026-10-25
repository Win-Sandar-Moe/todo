import {useEffect, useState} from "react";
import type {TodoDto} from "../todo/dto/TodoDto.ts";
import {fetchAllTodoApiCall} from "../todo/api/TodoApi.ts";

export default function useTodos() {
    const [todos,setTodos]=useState<TodoDto[]>([]);
    useEffect(() => {
        const getAllTodos= async ()=>{
            try{
                const todos = await fetchAllTodoApiCall();
                setTodos(todos);
            }catch (e) {
                console.log(e);
            }
        }
        getAllTodos();
    }, []);
    return (
        {todos,setTodos}
    );
}
