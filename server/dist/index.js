"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const userTypeDefs_1 = require("./graphQL/users/userTypeDefs");
const userResolvers_1 = require("./graphQL/users/userResolvers");
const index_1 = require("./config/index");
const taskTypeDefs_1 = require("./graphQL/tasks/taskTypeDefs");
const taskResolvers_1 = require("./graphQL/tasks/taskResolvers");
const projectResolvers_1 = require("./graphQL/projects/projectResolvers");
const projectTypeDefs_1 = require("./graphQL/projects/projectTypeDefs");
const allowedOrigins = [
    'http://localhost:3000'
];
const typeDefs = [userTypeDefs_1.userTypeDefs, taskTypeDefs_1.taskTypeDefs, projectTypeDefs_1.projectTypeDefs];
const resolvers = {
    Query: {
        ...userResolvers_1.userResolvers.Query,
        ...taskResolvers_1.taskResolvers.Query,
        ...projectResolvers_1.projectResolvers.Query,
    },
    Mutation: {
        ...userResolvers_1.userResolvers.Mutation,
        ...taskResolvers_1.taskResolvers.Mutation,
        ...projectResolvers_1.projectResolvers.Mutation,
    },
};
// Create an ApolloServer instance
const server = new apollo_server_express_1.ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    context: ({ req, res }) => {
        const token = req.headers.authorization || "";
        return { token };
    }
});
const startServer = async () => {
    // Create an Express instance
    const app = (0, express_1.default)();
    // Apply middleware
    app.use((0, cors_1.default)({
        origin: function (origin, callback) {
            if (!origin)
                return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = "CORS policy does not allow access from specified origin";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,
    }));
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });
    app.listen(index_1.PORT, () => {
        console.log(`Server is running on port: ${index_1.PORT}`);
    });
};
startServer();
