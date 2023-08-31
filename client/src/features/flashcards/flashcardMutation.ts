import { gql } from '@apollo/client'

export const CREATE_FLASHCARD = gql`
    mutation createFlashcard($input: CreateFlashcardInput!) {
        createFlashcard(input: $input) {
            flashcard_id
            user_id
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

export const UPDATE_FLASHCARD = gql`
  mutation updateFlashcard($input: UpdateFlashcardInput!) {
    updateFlashcard(input: $input) {
        flashcard_id
        user_id
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

export const DELETE_FLASHCARD = gql`
    mutation deleteFlashcard($id: ID!) {
        deleteFlashcard(id: $id) {
            message
        }
    }
`