import React from 'react';
import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/signed-in/Dashboard";
import { ProtectedRoute } from '../components/ProtectedRoute';
import Register from '../pages/signed-out/Register';
import Login from '../pages/signed-out/Login';
import { Layout } from '../layouts/Layout';
import Study from '../pages/signed-in/Study';
import Tasks from '../pages/signed-in/Tasks';
import Projects from '../pages/signed-in/Projects';
import ViewTask from '../pages/signed-in/ViewTask';
import EditTask from '../pages/signed-in/EditTask';
import ViewProject from '../pages/signed-in/ViewProject';
import EditProject from '../pages/signed-in/EditProject';
import ViewTopic from '../pages/signed-in/ViewTopic';
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
        path: "/tasks/:taskId",
        element: React.createElement(ProtectedRoute, null,
            React.createElement(Layout, null,
                React.createElement(ViewTask, null)))
    },
    {
        path: "/tasks/edit/:taskId",
        element: React.createElement(ProtectedRoute, null,
            React.createElement(Layout, null,
                React.createElement(EditTask, null)))
    },
    {
        path: "/projects",
        element: React.createElement(ProtectedRoute, null,
            React.createElement(Layout, null,
                React.createElement(Projects, null)))
    },
    {
        path: "/projects/:projectId",
        element: React.createElement(ProtectedRoute, null,
            React.createElement(Layout, null,
                React.createElement(ViewProject, null)))
    },
    {
        path: "/projects/edit/:projectId",
        element: React.createElement(ProtectedRoute, null,
            React.createElement(Layout, null,
                React.createElement(EditProject, null)))
    },
    {
        path: "/study/:topicId",
        element: React.createElement(ProtectedRoute, null,
            React.createElement(Layout, null,
                React.createElement(ViewTopic, null)))
    },
    {
        path: "*",
        element: React.createElement(Navigate, { to: "/dashboard" })
    }
]);
export default router;
