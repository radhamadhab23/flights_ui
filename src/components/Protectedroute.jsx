// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
    const { token } = useAuth(); // Get the token from our auth context

    // Check if the user is authenticated
    if (!token) {
        // If not, redirect them to the /login page
        return <Navigate to="/login" replace />;
    }

    // If they are authenticated, render the child route component
    return <Outlet />;
};

export default ProtectedRoute;