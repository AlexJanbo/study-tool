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

    input UpdateTaskTitleInput {
        id: ID!,
        title: String!,
    }

    input UpdateTaskDescriptionInput {
        id: ID!,
        description: String!,
    }

    input UpdateTaskPriorityInput {
        id: ID!,
        priority: String!,
    }

    input UpdateTaskStatusInput {
        id: ID!,
        status: String!,
    }

    input UpdateTaskDeadlineInput {
        id: ID!,
        deadline: String!,
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

    type TaskEvent {
        event_id: ID!,
        task_id: ID!,
        field_changed: String!,
        old_value: String!,
        new_value: String!,
        updated_at: Float!,

    }

    type DeleteTaskResponse {
        message: String!
    }

    type Query {
        getTasksByUser: [Task!]!
        getTask(id: ID!): Task!
        getTaskEvents(id: ID!): [TaskEvent!]!
    }

    type Mutation {
        createTask(input: CreateTaskInput!): Task!
        updateTask(input: UpdateTaskInput!): Task!
        updateTaskTitle(input: UpdateTaskTitleInput!): Task!
        updateTaskDescription(input: UpdateTaskDescriptionInput!): Task!
        updateTaskPriority(input: UpdateTaskPriorityInput!): Task!
        updateTaskStatus(input: UpdateTaskStatusInput!): Task!
        updateTaskDeadline(input: UpdateTaskDeadlineInput!): Task!
        deleteTask(id: ID!): DeleteTaskResponse!
    }
`;
