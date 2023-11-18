import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Register from './auth/Register';
import SoftwareNewGradPage from "./pages/SoftwareNewGradPage";
import Login from './auth/Login';
import Dashboard from './components/Dashboard.js';
import JobPostingForm from './pages/JobPostingForm';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    return (
        <Router>
            <div>
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user}  />
                <Routes>
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/software-newgrad" element={<SoftwareNewGradPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/add-job-post" element={<JobPostingForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
