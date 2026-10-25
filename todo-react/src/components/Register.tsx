import {type SubmitHandler, useForm} from "react-hook-form";
import type {RegisterDto} from "../auth/RegisterDto.ts";
import {registerApiCall} from "../auth/AuthService.ts";
import {useNavigate} from "react-router-dom";

export default function Register() {
    const {register,reset,handleSubmit} = useForm<RegisterDto>();
    const navigator = useNavigate();
    const registerHandler:SubmitHandler<RegisterDto> = (data)=>{
        console.log(data);
        registerApiCall(data)
            .then(res =>{
                console.log(res.data);
                reset();
                navigator("/login");
            })
            .catch(err => console.log(err));

    }
    return (
        <>
             <div className="container mt-5">
                 <div className="row">
                     <div className="offset-3 col-md-6">
                         <form onSubmit={handleSubmit(registerHandler)}>
                             <div className="mb-3">
                                 <label className="form-label">Username</label>
                                 <input type="text"
                                     {...register("username")}
                                 className="form-control"/>
                             </div>
                             <div className="mb-3">
                                 <label className="form-label">Password</label>
                                 <input type="text"
                                     {...register("password")}
                                 className="form-control"/>
                             </div>
                             <div className="mb-3">
                                 <label className="form-label">Email</label>
                                 <input type="text" className="form-control"
                                     {...register("email")}/>
                             </div>
                             <button className="btn btn-primary w-100">Register</button>
                         </form>
                     </div>
                 </div>
             </div>
        </>
    );
}
