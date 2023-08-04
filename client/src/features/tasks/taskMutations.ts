import { gql } from '@apollo/client'

export const CREATE_TASK = gql`
    mutation createTask($input: TaskInput!) {
        createTask(input: $input) {
            id
            title
            description
            status
            priority
            user_id
            deadline
        }
    }
`

export const DELETE_TASK = gql`
    mutation deleteTask($id: ID!) {
        deleteTask(id: $id) {
            message
        }
    }
`
