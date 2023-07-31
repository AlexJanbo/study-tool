import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Login from './pages/signed-out/Login';
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});
function App() {
    return (React.createElement(ApolloProvider, { client: client },
        React.createElement("div", { className: "App" },
            React.createElement(Login, null))));
}
export default App;
