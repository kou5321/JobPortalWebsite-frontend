import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({ email: '', username: '', password: '' });
    const [registrationSuccess, setRegistrationSuccess] = useState(false);  // New state for tracking success

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/register', formData);
            console.log(response.data);
            setRegistrationSuccess(true);  // Update state on successful registration
        } catch (error) {
            console.error(error);
            setRegistrationSuccess(false);  // Reset on failure
            // Handle errors (e.g., display error message)
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {registrationSuccess && <div>Registration successful!</div>}
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
