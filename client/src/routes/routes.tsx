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
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/dashboard",
    element: 
    <ProtectedRoute>
      <Layout>
        <Dashboard />
      </Layout>
    </ProtectedRoute>
  },
  {
    path: "/study",
    element: 
    <ProtectedRoute>
      <Layout>
        <Study />
      </Layout>
    </ProtectedRoute>
  },
  {
    path: "/tasks",
    element: 
    <ProtectedRoute>
      <Layout>
        <Tasks />
      </Layout>
    </ProtectedRoute>
  },
  {
    path: "/projects",
    element: 
    <ProtectedRoute>
      <Layout>
        <Projects />
      </Layout>
    </ProtectedRoute>
  },
  {
    path: "/profile",
    element: 
    <ProtectedRoute>
      <Layout>
        <Profile />
      </Layout>
    </ProtectedRoute>
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" />
  }
]);

export default router;