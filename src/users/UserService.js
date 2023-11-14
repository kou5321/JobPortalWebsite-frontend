import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Replace with your Spring Boot app's URL

const register = (email, username, password) => {
    return axios.post(`${API_URL}/users/register`, { email, username, password });
};

const login = (username, password) => {
    // Updated to match backend's expected parameters
    return axios.post(`${API_URL}/users/login`, { username, password });
};

const logout = () => {
    // Implement logout logic if your backend requires it
    // For simple implementations without sessions or JWT, this might just clear client-side state
};

export default {
    register,
    login,
    logout,
};
