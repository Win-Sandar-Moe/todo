import type {LoginDto} from "./LoginDto.ts";
import  axios from "axios";
import type {RegisterDto} from "./RegisterDto.ts";

const AUTH_URL ='http://localhost:8080/api/auth';



export const loginApiCall = (loginDto:LoginDto) =>
    axios.post<string>(`${AUTH_URL}/login`,loginDto);

export const registerApiCall = (register:RegisterDto)=>{
    return axios.post<string>(`${AUTH_URL}/register`,register);
}


export const setToken = (token:string) =>
    localStorage.setItem("token",token);

export const getToken = () =>
    localStorage.getItem("token");

export const getLoggedInUserName = ()  =>{
    return localStorage.getItem("username");
}
export const setLoggedInUserName = (username:string) =>{
    localStorage.setItem("username", username);
}
export const isLoggedIn = () =>{
    return getLoggedInUserName() !== null;
}
export const logout = () =>{
    localStorage.clear();
}
