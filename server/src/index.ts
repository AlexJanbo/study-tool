import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphQL/schema';
import { PORT } from './config/index'


// Create an Express instance
const app = express()

// Apply middleware
app.use(cors())

// Create an ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res}) => ({})
})

server.applyMiddleware({ app, path: 'graphql'})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})