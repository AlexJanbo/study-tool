import { gql } from 'apollo-server-express'

export const taskTypeDefs = gql`
   
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
        tasks: [Task!]!
        task(id: ID!): Task
    }

    type Mutation {
        createTask(input: TaskInput!): Task!
    }
`
