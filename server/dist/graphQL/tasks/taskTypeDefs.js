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

    input CreateTaskInput {
        title: String!,
        description: String!,
        priority: PriorityType!,
        status: StatusType!,
        deadline: String,
    }

    input UpdateTaskInput {
        id: ID!,
        title: String!,
        description: String!,
        priority: PriorityType!,
        status: StatusType!,
        deadline: String,
    }

    type Task {
        id: ID!
        title: String!
        description: String!
        priority: PriorityType!
        status: StatusType!
        deadline: Float
        user_id: ID!
        created_at: Float
    }

    type DeleteTaskResponse {
        message: String!
    }

    type Query {
        getTasksByUser: [Task!]!
        getTask(id: ID!): Task!
    }

    type Mutation {
        createTask(input: CreateTaskInput!): Task!
        updateTask(input: UpdateTaskInput!): Task!
        deleteTask(id: ID!): DeleteTaskResponse!
    }
`;
