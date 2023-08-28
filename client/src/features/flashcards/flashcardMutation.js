import { gql } from '@apollo/client';
export const CREATE_FLASHCARD = gql `
    mutation createFlashcard($input: CreateFlashcardInput!) {
        createFlashcard(input: $input) {
            flashcard_id
            card_type
            content
            answer
            last_reviewed
            confidence_level
        }
    }
`;
