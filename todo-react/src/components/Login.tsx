import {type SubmitHandler, useForm} from "react-hook-form";
import type {LoginDto} from "../auth/LoginDto.ts";
import {loginApiCall, setLoggedInUserName, setToken} from "../auth/AuthService.ts";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const {register,reset,handleSubmit} = useForm<LoginDto>();
    const navigator = useNavigate();
    const loginHandler:SubmitHandler<LoginDto> = (data) =>{
        loginApiCall(data)
            .then(res => {
                console.log(res.data);
                const token = 'Basic '+btoa(`${data.userNameEmail}:${data.password}`);
                setToken(token);
                setLoggedInUserName(data.userNameEmail);
                reset();
                navigator("/");
                window.location.reload();
            })
            .catch(err => console.log(err));
    }
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="offset-3 col-md-6">
                        <form className="border border-black p-5 rounded" onSubmit={handleSubmit(loginHandler)}>
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input type="text" className="form-control"
                                    {...register("userNameEmail")}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="text" className="form-control"
                                       {...register("password")}/>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
