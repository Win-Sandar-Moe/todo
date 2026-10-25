
import useTodos from "../hook/useTodos.tsx";
import {Link} from "react-router-dom";
import {changeStatusCompletedApiCall, deleteTodoApiCall} from "./api/TodoApi.ts";

export default  function TodoList() {
    const {todos,setTodos} = useTodos();

    const updateTodo = async (id:number)=>{
        try{
            const returnTodo=await changeStatusCompletedApiCall(id);
            const updatedTodos = todos
                .map(todo => todo.id === id ? returnTodo : todo);
            setTodos(updatedTodos);
        }catch (e){
            console.log(e);
        }
    }

    const deleteTodo =  async (id:number) => {
        try{
            await deleteTodoApiCall(id);
            const updatedTodos = todos.
            filter(todo => todo.id !== id);
            setTodos(updatedTodos);
        }catch (e){
            console.log(e);
        }
    }

    return (
        <>
            <div className="container mt-5">
                <Link to="/todo-form" className="btn btn-primary mb-3">Add New Todo</Link>
                <table className="table table-striped table-bordered rounded">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todos && todos.length > 0 && todos.map(todo =>(
                            <tr key={todo.id}>
                                <td>{todo.id}</td>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.isCompleted ? 'Completed' : 'Not Completed'}</td>
                                <td>
                                    <button
                                        onClick={() => updateTodo(todo.id)}
                                        className="btn btn-primary me-2">Edit</button>
                                    <button onClick={() => deleteTodo(todo.id)}
                                            className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>
    );
}
