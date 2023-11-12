import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Replace with your Spring Boot app's URL

const register = (email, username, password) => {
    return axios.post(`${API_URL}/users/register`, { email, username, password });
};

const login = (email, username, password) => {
    return axios.post(`${API_URL}/users/login`, { email, username, password });
};

const logout = () => {
    // Implement logout logic if your backend requires it
};

export default {
    register,
    login,
    logout,
};
