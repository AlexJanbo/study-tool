import React from 'react';
import { AddUser } from './features/auth/AddUser';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});
function App() {
    return (React.createElement(ApolloProvider, { client: client },
        React.createElement("div", { className: "App" },
            React.createElement(AddUser, null))));
}
export default App;
