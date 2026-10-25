import type {ReactNode} from "react";
import {isLoggedIn} from "./AuthService.ts";
import Login from "../components/Login.tsx";


export default function AuthGuard({children}:{children:ReactNode}) {
    const beLoggedIn = isLoggedIn();
    console.log(`BeLogin ${beLoggedIn}`);
    if(!beLoggedIn){
        return (
            <Login />
        );
    }
    return (
        <>
            {children}
        </>
    );
}
