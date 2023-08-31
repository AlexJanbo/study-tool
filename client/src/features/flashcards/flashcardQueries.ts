import { gql } from '@apollo/client'

export const GET_FLASHCARDS_BY_USER = gql`
    query getFlashcardsByUser {
        getFlashcardsByUser {
            flashcard_id
            card_type
            content
            answer
            last_reviewed
            confidence_level
            created_at
        }
    }
`

export const GET_FLASHCARDS_BY_TOPIC = gql`
    query getFlashcardsByTopic($id: ID!) {
        getFlashcardsByTopic(id: $id) {
            flashcard_id
            card_type
            content
            answer
            last_reviewed
            confidence_level
            created_at
            topic_id
        }
    }
`

export const GET_FLASHCARD_BY_ID = gql`
    query getFlashcard($id: ID!) {
        getFlashcard(id: $id) {
            flashcard_id
            card_type
            content
            answer
            last_reviewed
            confidence_level
            created_at
        }
    }
`