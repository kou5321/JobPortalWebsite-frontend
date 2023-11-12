import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from './assets/ameslogo.png'; // Your logo image path
import './header.css'; // Your CSS file path

const Header = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        // Assuming you have a route set up for login
        navigate('/login');
    };

    const handleRegisterClick = () => {
        // Assuming you have a route set up for register
        navigate('/register');
    };

    return (
        <header className="header">
            <div className="container">
                <div className="logoAndTitle">
                    <img src={logo} alt="JobPulse Logo" className="logo" />
                    <p className="appTitle ml-2">JobPortal</p>
                </div>
                <nav className="navLinks">
                    <NavLink to="/software-newgrad" className="navLink">👩🏻‍💻 Software NewGrad</NavLink>
                    <NavLink to="/software-intern" className="navLink">🧑🏽‍💻 Software Intern</NavLink>
                    <NavLink to="/product-fulltime" className="navLink">🙋🏼 Product Full-Time</NavLink>
                    <NavLink to="/product-intern" className="navLink">🙋 Product Intern</NavLink>
                </nav>
                <div>
                    <button onClick={handleLoginClick} className="loginBtn">Log In</button>
                    <button onClick={handleRegisterClick} className="loginBtn">Register</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
