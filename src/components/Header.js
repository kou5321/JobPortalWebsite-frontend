import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authContext';
import logo from '../assets/logo.png';
import '../styles/header.css';

const Header = () => {
    const navigate = useNavigate();
    const [ showDropdown, setShowDropdown ] = useState(false);
    const { isLoggedIn, user, logout } = useAuth();

    const handleLogoutClick = () => {
        logout();
    };
    const isAdmin = () => {
        return isLoggedIn && user?.roles?.includes('ADMIN');
    };


    return (
        <header className="header">
            <div className="container">
                <div className="logoAndTitle">
                    <img src={logo} alt="AMES Logo" className="logo" />
                    <NavLink to="/software-newgrad" className="appTitle ml-2">JobPortal</NavLink>
                </div>
                <nav className="navLinks">
                    <NavLink to="/software-newgrad" className="navLink"><span role="img" aria-label="Software NewGrad">👩🏻‍💻</span> Software NewGrad</NavLink>
                    <NavLink to="/software-intern" className="navLink"><span role="img" aria-label="Software NewGrad">👩‍💻</span> Software Intern</NavLink>
                    <NavLink to="/data-fulltime" className="navLink"><span role="img" aria-label="Software NewGrad">🙋‍♂️</span> Data Full-Time</NavLink>
                    <NavLink to="/data-intern" className="navLink"><span role="img" aria-label="Software NewGrad">🙋</span> Data Intern</NavLink>
                </nav>
                <div>
                    {isLoggedIn ? (
                        <div
                            className="user-menu"
                            onMouseOver={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <span className="username">
                                Welcome! {user?.username}
                            </span>
                            {showDropdown && (
                                <div className="dropdown-menu">
                                    <div className="dropdown-item" onClick={() => navigate('/dashboard')}>Dashboard</div>
                                    {isAdmin() && ( // Check if the user is an admin before displaying this option
                                        <div className="dropdown-item" onClick={() => navigate('/add-job-post')}>Add job post</div>
                                    )}
                                    <div className="dropdown-item" onClick={handleLogoutClick}>Log Out</div>
                                </div>
                            )}
                        </div>
                    ) : (
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
