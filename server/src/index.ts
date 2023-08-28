import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express';
import { userTypeDefs } from './graphQL/users/userTypeDefs';
import { userResolvers } from './graphQL/users/userResolvers'; 
import { PORT } from './config/index'
import { taskTypeDefs } from './graphQL/tasks/taskTypeDefs';
import { taskResolvers } from './graphQL/tasks/taskResolvers';
import { authentication } from './middleware/authentication';
import { projectResolvers } from './graphQL/projects/projectResolvers';
import { projectTypeDefs } from './graphQL/projects/projectTypeDefs';
import { commentResolvers } from './graphQL/comments/commentResolvers';
import { commentTypeDefs } from './graphQL/comments/commentTypeDefs';
import { topicTypeDefs } from './graphQL/topics/topicTypeDefs';
import { topicResolvers } from './graphQL/topics/topicResolvers';
import { flashcardResolvers } from './graphQL/flashcards/flashcardResolvers';
import { flashcardTypeDefs } from './graphQL/flashcards/flashcardTypeDefs';


const allowedOrigins = [
  'http://localhost:3000'
]

const typeDefs = [userTypeDefs, taskTypeDefs, projectTypeDefs, commentTypeDefs, topicTypeDefs, flashcardTypeDefs]

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...taskResolvers.Query,
    ...projectResolvers.Query,
    ...commentResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...taskResolvers.Mutation,
    ...projectResolvers.Mutation,
    ...commentResolvers.Mutation,
    ...topicResolvers.Mutation,
    ...flashcardResolvers.Mutation,
  },
}

// Create an ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: ({ req, res}) => {
    const token = req.headers.authorization || ""

    return { token }
  }
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
