import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext.js'; // Import useAuth hook
import UserService from './UserService';
import '../App.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const { login } = useAuth(); // Use login function from context

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await UserService.login(username, password);
            const roles = response.data.roles.map(role => role.name);
            const userForContext = {
                ...response.data,
                roles: roles
            };
            login(userForContext);
            navigate('/software-newgrad');
        } catch (error) {
            console.error(error);
            setErrorMessage('Username or password not found');
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleLogin}>
                <input
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button className="form-button" type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
