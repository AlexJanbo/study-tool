import { gql } from '@apollo/client'

export const GET_TASKS_BY_USER = gql`
    query getTasksByUser {
        getTasksByUser {
            id
            title
            description
            priority
            status
            deadline
            created_at
        }
    }
`

export const GET_TASK = gql`
    query getTask($id: ID!) {
        getTask(id: $id) {
            id
            title
            description
            priority
            status
            deadline
            created_at
        }
    }
`