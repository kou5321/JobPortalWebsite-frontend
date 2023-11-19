import axios from 'axios';

const API_URL = 'http://localhost:8080';

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
