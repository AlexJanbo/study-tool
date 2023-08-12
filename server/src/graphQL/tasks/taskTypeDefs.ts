import { gql } from 'apollo-server-express'

export const taskTypeDefs = gql`
   

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
        updateTaskTitle(input: UpdateTaskTitleInput!): Task!
        updateTaskDescription(input: UpdateTaskDescriptionInput!): Task!
        updateTaskPriority(input: UpdateTaskPriorityInput!): Task!
        updateTaskStatus(input: UpdateTaskStatusInput!): Task!
        updateTaskDeadline(input: UpdateTaskDeadlineInput!): Task!
        deleteTask(id: ID!): DeleteTaskResponse!
    }
`
