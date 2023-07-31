import React from 'react'
import { AddUser } from './features/auth/AddUser';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import Login from './pages/signed-out/Login';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})


function App() {
  return (

    <ApolloProvider client={client} >

      <div className="App">
        <Login /> 
        {/* <AddUser /> */}
      </div>
    </ApolloProvider>
  );
}

export default App;
