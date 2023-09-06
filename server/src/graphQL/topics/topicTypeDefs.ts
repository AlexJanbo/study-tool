import { gql } from 'apollo-server-express'

export const topicTypeDefs = gql`
   

    input CreateTopicInput {
        title: String!,
    }

    type Topic {
        topic_id: ID!
        user_id: ID!
        title: String!
    }

    type DeleteTopicResponse {
        message: String!
    }

    type Query {
        getTopicsByUser: [Topic!]!
        getTopic(id: ID!): Topic!
    }

    type Mutation {
        createTopic(input: CreateTopicInput!): Topic!
        deleteTopic(id: ID!): DeleteTopicResponse!
    }
`