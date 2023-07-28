import React from 'react'
import Register from './pages/signed-out/Register';
import { AddUser } from './features/auth/AddUser';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})


function App() {
  return (

    <ApolloProvider client={client} >

    <div className="App">
      {/* * <Register /> */} 
        <AddUser />
      </div>
    </ApolloProvider>
  );
}

export default App;
