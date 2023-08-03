"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.taskTypeDefs = (0, apollo_server_express_1.gql) `
   
    type User {
        id: ID!,
        username: String!,
        email: String!
    }

    enum PriorityType {
        High
        Medium
        Low
    }

    enum StatusType {
        InProgress
        Completed
        Created


    }

    type Task {
        id: ID!
        user: User!
        title: String!
        description: String!
        priority: PriorityType
        status: StatusType
        deadline: String
    }

    type Query {
        tasks: [Task!]!
        task(id: ID!): Task
    }

    type Mutation {
        createTask(title: String!, description: String!, userId: ID!): Task!
    }
`;
