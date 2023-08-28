import { gql } from '@apollo/client';
export const GET_FLASHCARDS_BY_USER = gql `
    query getFlashcardsByUser {
        getFlashcardsByUser {
            flashcard_id
            type
            content
            answer
            last_reviewed
            confidencetopic_id
            title
        }
    }
`;
export const GET_FLASHCARD = gql `
    query getFlashcard($id: ID!) {
        getFlashcard(id: $id) {
            flashcard_id
            type
            content
            answer
            last_reviewed
            confidencetopic_id
            title
        }
    }
`;
