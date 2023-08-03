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

    type taskInput {
        title: String!,
        description: String!,
        priority: String!,
        statis: String!,
        userId: String!,
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
        createTask(input: taskInput!): Task!
    }
`
