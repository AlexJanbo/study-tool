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
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>
  },
  {
    path: "/profile",
    element: <ProtectedRoute><Profile /></ProtectedRoute>
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" />
  }
]);

export default router;