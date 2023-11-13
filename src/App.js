import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Register from './users/Register';
import SoftwareNewGradPage from "./SoftwareNewGradPage";
import Login from './users/Login';
// Import other necessary components

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/software-newgrad" element={<SoftwareNewGradPage />} />
                    {/* Other routes */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
