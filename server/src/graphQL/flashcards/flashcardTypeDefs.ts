import { gql } from 'apollo-server-express'

export const flashcardTypeDefs = gql`
   
    enum FlashcardType {
        Basic
        Cloze
    }

    input CreateFlashcardInput {
        card_type: FlashcardType!
        content: String!
        answer: String!
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
    }


    type Mutation {
        createFlashcard(input: CreateFlashcardInput!): Flashcard!
    }
`