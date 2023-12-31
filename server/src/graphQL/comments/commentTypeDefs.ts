import { gql } from 'apollo-server-express'

export const commentTypeDefs = gql`
   

    input CreateCommentInput {
        task_id: ID!,
        description: String!,
        image: String,
    }

    type Comment {
        comment_id: ID!,
        task_id: ID!,
        user_id: ID!
        description: String!
        image: String,
        created_at: String!
    }

    type DeleteProjectResponse {
        message: String!
    }

    type Query {
        getCommentsByTask(id: ID!): [Comment!]!
    }

    type Mutation {
        createComment(input: CreateCommentInput!): Comment!
        deleteComment(id: ID!): DeleteProjectResponse!
    }
`