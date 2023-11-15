import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from './assets/ameslogo.png'; // Your logo image path
import './header.css'; // Your CSS file path

const Header = ({ isLoggedIn, setIsLoggedIn, user }) => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleLogoutClick = () => {
        setIsLoggedIn(false);
    };

    return (
        <header className="header">
            <div className="container">
                <div className="logoAndTitle">
                    <img src={logo} alt="AMES Logo" className="logo" />
                    <NavLink to="/software-newgrad" className="appTitle ml-2">JobPortal</NavLink>
                </div>
                <nav className="navLinks">
                    <NavLink to="/software-newgrad" className="navLink">👩🏻‍💻 Software NewGrad</NavLink>
                    <NavLink to="/software-intern" className="navLink">🧑🏽‍💻 Software Intern</NavLink>
                    <NavLink to="/data-fulltime" className="navLink">🙋🏼 Data Full-Time</NavLink>
                    <NavLink to="/data-intern" className="navLink">🙋 Data Intern</NavLink>
                </nav>
                <div>
                    {isLoggedIn ? (
                        <div className="user-menu">
                        <span
                            className="username"
                            onMouseOver={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(true)}
                        >
                            Welcome! {user?.username}
                        </span>
                            {showDropdown && (
                                <div className="dropdown-menu">
                                    {/*TODO: add a dash board*/}
                                    <div className="dropdown-item" onClick={() => navigate('/dashboard')}>Dashboard</div>
                                    <div className="dropdown-item" onClick={handleLogoutClick}>Log Out</div>
                                </div>
                            )}
                        </div>
                    )  : (
                        <>
                            <button onClick={() => navigate('/login')} className="loginBtn">Log In</button>
                            <button onClick={() => navigate('/register')} className="loginBtn">Register</button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
