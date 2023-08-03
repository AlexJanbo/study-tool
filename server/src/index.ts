import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express';
import { userTypeDefs } from './graphQL/users/userTypeDefs';
import { userResolvers } from './graphQL/users/userResolvers'; 
import { PORT } from './config/index'
import { taskTypeDefs } from './graphQL/tasks/taskTypeDefs';
import { taskResolvers } from './graphQL/tasks/taskResolvers';


const allowedOrigins = [
  'http://localhost:3000'
]

const typeDefs = [userTypeDefs, taskTypeDefs]

const resolvers = {
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...taskResolvers.Mutation,
  },
}

// Create an ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: ({ req, res}) => ({})
})

const startServer = async () => {
  
  // Create an Express instance
  const app = express()
  // Apply middleware
  app.use(cors({
    origin: function(origin, callback) {
      if(!origin) return callback(null, true)

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "CORS policy does not allow access from specified origin"
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
    credentials: true,
  }))

  await server.start()
  server.applyMiddleware({ app, path: '/graphql'})


  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
  })

}

startServer()
