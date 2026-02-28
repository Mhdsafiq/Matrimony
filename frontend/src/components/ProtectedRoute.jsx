import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../services/api';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const loggedIn = isAuthenticated();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/');
        }
    }, [loggedIn, navigate]);

    return loggedIn ? children : null;
};

export default ProtectedRoute;
