import React, { useEffect, useState } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AddUser } from './features/auth/AddUser';
import Login from './pages/signed-out/Login';
import Register from './pages/signed-out/Register';
import { ProtectedRoute } from './components/ProtectedRoute';
import Dashboard from './pages/signed-in/Dashboard';
import { AuthProvider } from './features/auth/AuthContext';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})



function App() {


  return (

    <ApolloProvider client={client} >
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard"
              element={
                <ProtectedRoute >
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
