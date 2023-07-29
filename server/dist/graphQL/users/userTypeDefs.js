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

    input UserInput {
        username: String!
        email: String!
        password: String!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
    }

    type Mutation {
        addUser(input: UserInput!): User!
    }
`;
