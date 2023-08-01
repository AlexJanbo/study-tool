import React from 'react';
import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/signed-in/Dashboard";
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Profile } from '../pages/signed-in/Profile';
import Register from '../pages/signed-out/Register';
import Login from '../pages/signed-out/Login';
const router = createBrowserRouter([
    {
        path: "/",
        element: React.createElement(Login, null)
    },
    {
        path: "/register",
        element: React.createElement(Register, null)
    },
    {
        path: "/dashboard",
        element: React.createElement(ProtectedRoute, null,
            React.createElement(Dashboard, null))
    },
    {
        path: "/profile",
        element: React.createElement(ProtectedRoute, null,
            React.createElement(Profile, null))
    },
    {
        path: "*",
        element: React.createElement(Navigate, { to: "/dashboard" })
    }
]);
export default router;
