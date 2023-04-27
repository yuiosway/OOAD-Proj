import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';




const Navbar = () => {
  return (
    <>
        <nav className="navbar navbar-expand-lg">
            <p className = 'nav-header'>Common Eduction Data Store</p>
            <div className="nav-items ms-auto" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" end>Home</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/table">Table</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/options">Options</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/upload">Upload</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                    </li>

                </ul>
            </div>
        </nav>
    </>
  );
};

export default Navbar;