import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String 
    }

    input UserInput {
        username: String!
        email: String!
        password: String!
    }

    input LoginCredentials {
        email: String!
        password: String
    }

    type AuthPayload {
        token: String!,
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
    }

    type Mutation {
        addUser(input: UserInput!): User!
        loginUser(input: LoginCredentials!): AuthPayload!
    }
`;