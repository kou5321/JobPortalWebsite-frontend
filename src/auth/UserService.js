import axios from 'axios';

const API_URL = 'http://localhost:8080';

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

const register = (email, username, password) => {
    return axios.post(`${API_URL}/users/register`, { email, username, password });
};

const login = (username, password) => {
    return axios.post(`${API_URL}/users/login`, { username, password });
};

const logout = () => {
    // in the future, backend will implement this part using JWT
};

export default {
    register,
    login,
    logout,
};
