import { gql } from 'apollo-server-express'

export const projectTypeDefs = gql`
   

    input CreateProjectInput {
        title: String!,
        description: String!,
    }

    input CreateGroupProjectInput {
        title: String!,
        description: String!,
        members: [ID!]!,
    }

    input UpdateProjectInput {
        id: ID!,
        title: String!,
        description: String!,
    }

    type Project {
        id: ID!
        owner: ID!
        title: String!
        description: String!
        members: [ID!]!
        created_at: String!
    }

    type DeleteProjectResponse {
        message: String!
    }

    type Query {
        getProjectsByUser: [Project!]!
        getProject(id: ID!): Project!
    }

    type Mutation {
        createProject(input: CreateProjectInput!): Project!
        createGroupProject(input: CreateGroupProjectInput!): Project!
        updateProject(input: UpdateProjectInput!): Project!
        deleteProject(id: ID!): DeleteProjectResponse!
    }
`