import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './features/auth/AuthContext';
import router from './routes/routes';
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});
function App() {
    return (React.createElement(ApolloProvider, { client: client },
        React.createElement(AuthProvider, null,
            React.createElement(RouterProvider, { router: router }))));
}
export default App;
