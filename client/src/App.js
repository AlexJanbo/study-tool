import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/signed-out/Login';
import Register from './pages/signed-out/Register';
import { ProtectedRoute } from './components/ProtectedRoute';
import Dashboard from './pages/signed-in/Dashboard';
import { AuthProvider } from './features/auth/AuthContext';
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});
function App() {
    return (React.createElement(ApolloProvider, { client: client },
        React.createElement(AuthProvider, null,
            React.createElement(Router, null,
                React.createElement(Routes, null,
                    React.createElement(Route, { path: "/", element: React.createElement(Login, null) }),
                    React.createElement(Route, { path: "/register", element: React.createElement(Register, null) }),
                    React.createElement(Route, { path: "/dashboard", element: React.createElement(ProtectedRoute, null,
                            React.createElement(Dashboard, null)) }),
                    React.createElement(Route, { path: "*", element: React.createElement(Navigate, { to: "/dashboard" }) }))))));
}
export default App;
