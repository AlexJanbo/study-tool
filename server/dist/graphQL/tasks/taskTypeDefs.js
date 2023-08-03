"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.taskTypeDefs = (0, apollo_server_express_1.gql) `
   

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

    input TaskInput {
        title: String!,
        description: String!,
        priority: PriorityType!,
        status: StatusType!,
    }

    type Task {
        id: ID!
        title: String!
        description: String!
        priority: PriorityType!
        status: StatusType!
        deadline: String
        user_id: ID!
    }

    type Query {
        getTasksByUser: [Task!]!
        getTask(id: ID!): Task!
    }

    type Mutation {
        createTask(input: TaskInput!): Task!
    }
`;
