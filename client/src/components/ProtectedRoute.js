import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../features/auth/AuthContext';
export const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    if (!token) {
        console.log("Protected route, unauthorized");
        return React.createElement(Navigate, { to: "/login" });
    }
    return React.createElement(React.Fragment, null, token ? children : null);
};
