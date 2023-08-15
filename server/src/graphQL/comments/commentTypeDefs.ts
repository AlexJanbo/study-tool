import { gql } from 'apollo-server-express'

export const commentTypeDefs = gql`
   

    input CreateCommentInput {
        comment_id: String!,
        task_id: String!,
        description: String!,
        image: String,
        created_at: String!
    }

    type Comment {
        id: ID!
        owner: ID!
        title: String!
        description: String!
        members: [ID!]!
        created_at: String!
    }

    type DeleteProjectResponse {
        comment_id
        message: String!
    }

    type Query {
        getCommentsByTask: [Comment!]!
    }

    type Mutation {
        createComment(input: CreateCommentInput!): Comment!
        deleteProject(id: ID!): DeleteProjectResponse!
    }
`