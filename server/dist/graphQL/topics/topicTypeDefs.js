"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.topicTypeDefs = (0, apollo_server_express_1.gql) `
   

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
    }
`;
