import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Register from './auth/Register.jsx';
import SoftwareNewGradPage from "./pages/SoftwareNewGradPage";
import Login from './auth/Login';
import Dashboard from './pages/Dashboard.js';
import JobPostingForm from './pages/JobPostingForm';
import MainPage from "./pages/MainPage";
import { AuthProvider } from './auth/AuthProvider';
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div>
                    <Header />
                    <Routes>
                        <Route path="/" element = {<MainPage/>} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/software-newgrad" element={<SoftwareNewGradPage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                            <Route path="/add-job-post" element={<JobPostingForm />} />
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
