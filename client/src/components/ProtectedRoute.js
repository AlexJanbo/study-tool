import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../features/auth/AuthContext';
export const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    console.log(token);
    if (!token) {
        console.log("Protected route, unauthorized");
        return React.createElement(Navigate, { to: "/" });
    }
    return React.createElement(React.Fragment, null, children);
};
