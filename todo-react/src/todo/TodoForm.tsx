import {type SubmitHandler, useForm} from "react-hook-form";
import type {TodoDto} from "./dto/TodoDto.ts";
import {createTodo} from "./api/TodoApi.ts";
import {useNavigate} from "react-router-dom";


export default function TodoForm() {
    const {register,handleSubmit,reset} = useForm<TodoDto>();
    const navigator = useNavigate();
    const onSubmit:SubmitHandler<TodoDto> = async (data) =>{
        try{
            await createTodo(data);
            reset();
            navigator('/');
        }catch (e){
            console.log(e);
        }
    }
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="border border-primary rounded p-5">
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input type="text" className="form-control"
                                    {...register('title')}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea className="form-control" rows={5}
                                          {...register('description')}
                                />
                            </div>
                            <button className="btn btn-primary w-100">Create Todo</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
