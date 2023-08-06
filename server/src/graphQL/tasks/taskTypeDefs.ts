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

    input TaskInput {
        title: String!,
        description: String!,
        priority: PriorityType!,
        status: StatusType!,
        id: ID!,
        deadline: String,
    }

    type Task {
        id: ID!
        title: String!
        description: String!
        priority: PriorityType!
        status: StatusType!
        deadline: Date
        user_id: ID!
    }

    type DeleteTaskResponse {
        message: String!
    }

    type Query {
        getTasksByUser: [Task!]!
        getTask(id: ID!): Task!
    }

    type Mutation {
        createTask(input: TaskInput!): Task!
        updateTask(input: TaskInput!): Task!
        deleteTask(id: ID!): DeleteTaskResponse!
    }
`
