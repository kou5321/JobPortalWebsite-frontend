import React, { useState } from 'react';
import UserService from './UserService';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // For displaying any error messages

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const response = await UserService.register(email, username, password);
            console.log('Registration response:', response.data);
            // Handle registration success
            // You may want to redirect the user or clear the form here
        } catch (error) {
            console.error('Registration error:', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                setError(error.response.data.message || 'An error occurred during registration');
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
                setError('No response from server');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                setError(error.message);
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Register;
