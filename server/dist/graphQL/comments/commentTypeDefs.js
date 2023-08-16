"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.commentTypeDefs = (0, apollo_server_express_1.gql) `
   

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
`;
