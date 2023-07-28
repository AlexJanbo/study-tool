import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        password: String 
    }

    input UserInput {
        name: String!
        email: String!
        password: String!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
    }

    type Mutation {
        addUser(input: UserInput!): User!
    }
`;