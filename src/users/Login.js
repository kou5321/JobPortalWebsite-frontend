import React, { useState } from 'react';
import UserService from './UserService';
import '../App.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await UserService.login('', username, password);
            console.log(response.data);
            // Handle login success
        } catch (error) {
            console.error(error);
            // Handle login error
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input className="form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button className="form-button" type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
