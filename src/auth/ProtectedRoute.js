import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !allowedRoles.some(role => user.roles.includes(role))) {
            navigate('/login'); // redirect to login page if not authorized
        }
    }, [user, allowedRoles, navigate]);

    return user && allowedRoles.some(role => user.roles.includes(role)) ? <Outlet /> : null;
};

export default ProtectedRoute;
