import React from "react";
import { Link, useNavigate } from 'react-router-dom';


function NavBar(props) {
    let navigate = useNavigate();

    // button loggout and remove the token from the local strage
    const logOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top navBar">
                <div className="container-fluid">
                    <div className="container">
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                {
                                    // if user does not have token 
                                    !(localStorage['token']) ?
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/about">About</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/login">Log in</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/signup">Sign up</Link>
                                            </li>
                                        </>
                                        :
                                        <>
                                            {/* if user has token */}
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/cards">Cards</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/favorite_cards">Favorite cards</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/add_card">Add cards</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link " to="/user_info">{props.userName}</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" onClick={logOut} to="/login">Logout</Link>
                                            </li>
                                        </>
                                }

                            </ul>
                        </div>
                    </div>
                </div>
            </nav >
        </div >

    )
}

export default NavBar;