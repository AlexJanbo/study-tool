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

    input taskIdInput {
        id: ID!
    }
    
    input userIdInput {
        id: ID!
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
        getTask(input: taskIdInput): Task!
    }

    type Mutation {
        createTask(input: TaskInput!): Task!
    }
`
