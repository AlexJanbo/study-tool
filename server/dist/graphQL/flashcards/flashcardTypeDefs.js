"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flashcardTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.flashcardTypeDefs = (0, apollo_server_express_1.gql) `
   
    enum FlashcardType {
        Basic
        Cloze
    }

    input CreateFlashcardInput {
        card_type: FlashcardType!
        content: String!
        answer: String!
        topic_id: String!
    }

    input UpdateFlashcardInput {
        flashcard_id: ID!
        card_type: String!
        content: String!
        answer: String!
    }

    type DeleteFlashcardResponse {
        message: String!
    }

    type Flashcard {
        flashcard_id: ID!
        user_id: ID!
        card_type: FlashcardType!
        content: String!
        answer: String!
        last_reviewed: String!
        confidence_level: Int!
        created_at: String!
        topic_id: String!
    }


    type Query {
        getFlashcardsByUser: [Flashcard!]!
        getFlashcardsByTopic(id: ID!): [Flashcard!]!
        getFlashcardById(id: ID!): Flashcard!
    }

    type Mutation {
        createFlashcard(input: CreateFlashcardInput!): Flashcard!
        updateFlashcard(input: UpdateFlashcardInput!): Flashcard!
        deleteFlashcard(id: ID!): DeleteFlashcardResponse!
    }
`;
