import React from 'react';
import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/signed-in/Dashboard";
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Profile } from '../pages/signed-in/Profile';
import Register from '../pages/signed-out/Register';
import Login from '../pages/signed-out/Login';
import { Layout } from '../layouts/Layout';
import Study from '../pages/signed-in/Study';
import Tasks from '../pages/signed-in/Tasks';
import Projects from '../pages/signed-in/Projects';
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
            React.createElement(Layout, null,
                React.createElement(Dashboard, null)))
    },
    {
        path: "/study",
        element: React.createElement(ProtectedRoute, null,
            React.createElement(Layout, null,
                React.createElement(Study, null)))
    },
    {
        path: "/tasks",
        element: React.createElement(ProtectedRoute, null,
            React.createElement(Layout, null,
                React.createElement(Tasks, null)))
    },
    {
        path: "/projects",
        element: React.createElement(ProtectedRoute, null,
            React.createElement(Layout, null,
                React.createElement(Projects, null)))
    },
    {
        path: "/profile",
        element: React.createElement(ProtectedRoute, null,
            React.createElement(Layout, null,
                React.createElement(Profile, null)))
    },
    {
        path: "*",
        element: React.createElement(Navigate, { to: "/dashboard" })
    }
]);
export default router;
