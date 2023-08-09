"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.projectTypeDefs = (0, apollo_server_express_1.gql) `
   

    input CreateProjectInput {
        title: String!,
        description: String!,
    }

    input UpdateProjectInput {
        id: ID!,
        title: String!,
        description: String!,
        members: [ID!],
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
        updateProject(input: UpdateProjectInput!): Project!
        deleteProject(id: ID!): DeleteProjectResponse!
    }
`;
