import {Link} from "react-router-dom";
import {getLoggedInUserName, isLoggedIn, logout} from "../auth/AuthService.ts";

export function Header() {
    const beLoggedIn = isLoggedIn();
    const username = getLoggedInUserName() ;
    const logoutHandler = () => {
        logout();
        window.location.reload();
    }
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-primary text-white">
                <Link to="/" className="navbar-brand px-3">Todo</Link>
                <button className="navbar-toggler" data-bs-target="#myNav"
                data-bs-toggle="collapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="myNav" className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        {
                            username && <li className="nav-item">
                               <span className="nav-link text-capitalize">Hi!{` ${username}`}</span>
                            </li>
                        }
                        {
                            !beLoggedIn && <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                        }
                        {
                            !beLoggedIn &&
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                        }

                        {
                            beLoggedIn &&
                            <li className="nav-item" >
                                <Link to="/login" onClick={logoutHandler} className="nav-link">Logout</Link>
                            </li>
                        }

                    </ul>
                </div>
            </nav>
        </>
    );
}
