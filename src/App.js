import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Register from './auth/Register.jsx';
import SoftwareNewGradPage from "./pages/SoftwareNewGradPage";
import Login from './auth/Login';
import Dashboard from './pages/Dashboard.js';
import JobPostingForm from './pages/JobPostingForm';
import { AuthProvider } from './auth/AuthProvider';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Header />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/software-newgrad" element={<SoftwareNewGradPage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/add-job-post" element={<JobPostingForm />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
