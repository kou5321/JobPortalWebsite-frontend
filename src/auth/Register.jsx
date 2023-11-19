import React, { useState, useEffect } from 'react';
import UserService from './UserService';
import '../styles/App.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    // State for registration
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (registrationSuccess) {
            const timer = setTimeout(() => {
                navigate('/software-newgrad');
            }, 2000);

            // Clear timeout if component unmounts
            return () => clearTimeout(timer);
        }
    }, [registrationSuccess, navigate]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const response = await UserService.register(email, username, password);
            console.log('Registration response:', response.data);
            setRegistrationSuccess(true);
        } catch (error) {
            console.error('Registration error:', error);
            setRegistrationSuccess(false);

            // Handle different types of errors
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
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    className="form-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
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
                <button className="form-button" type="submit">Register</button>
                {registrationSuccess && <div className="success-message">Registration successful!</div>}
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Register;
