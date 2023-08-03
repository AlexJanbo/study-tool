import { gql } from '@apollo/client'

export const CREATE_TASK = gql`
    mutation createTask($title: String!, $description: String!, $userId: ID!) {
        createTask(title: $title, description: $description, userId: $userId) {
            id
            title
            description
            status
            priority
            user {
                id
                username
                email
            }
            deadline
        }
    }
`
