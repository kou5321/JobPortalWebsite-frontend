import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Register from './users/Register';
import SoftwareNewGradPage from "./SoftwareNewGradPage";
import Login from './users/Login';
// Import other necessary components

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
                </Routes>
            </div>
        </Router>
    );
}

export default App;
