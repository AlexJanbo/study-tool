import React, { useState } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './features/auth/AuthContext';
import router from './routes/routes';
import { ThemeProvider } from '@mui/private-theming'
import { lightTheme, darkTheme } from './theme';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
  
})


function App() {

  const [ darkMode, setDarkMode ] = useState<Boolean>(true)

  return (

    <ApolloProvider client={client} >
      <AuthProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
