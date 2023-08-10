"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.userTypeDefs = (0, apollo_server_express_1.gql) `
    type User {
        id: ID!
        username: String!
        email: String!
        password: String 
    }

    type Users {
        id: ID!
        username: String!
        email: String!
    }

    input UserInput {
        username: String!
        email: String!
        password: String!
    }

    input LoginCredentials {
        email: String!
        password: String
    }

    input QueryInput {
        searchQuery: String!
        pageNumber: Int!
    }

    type AuthPayload {
        token: String!,
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        queryUsers(input: QueryInput!): [Users!]!
    }

    type Mutation {
        addUser(input: UserInput!): User!
        loginUser(input: LoginCredentials!): AuthPayload!
    }
`;
