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
    path:"/tasks/:taskId",
    element:
      <ProtectedRoute>
        <Layout>
          <ViewTask />
        </Layout>
      </ProtectedRoute>
  },
  {
    path:"/tasks/edit/:taskId",
    element:
      <ProtectedRoute>
        <Layout>
          <EditTask />
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
    path:"/projects/:projectId",
    element:
      <ProtectedRoute>
        <Layout>
          <ViewProject />
        </Layout>
      </ProtectedRoute>
  },
  {
    path:"/projects/edit/:projectId",
    element:
      <ProtectedRoute>
        <Layout>
          <EditProject />
        </Layout>
      </ProtectedRoute>
  },
  {
    path:"/study/:topicId",
    element:
      <ProtectedRoute>
        <Layout>
          <ViewTopic />
        </Layout>
      </ProtectedRoute>
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" />
  }
]);

export default router;