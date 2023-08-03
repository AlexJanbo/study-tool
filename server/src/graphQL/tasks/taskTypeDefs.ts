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
`
