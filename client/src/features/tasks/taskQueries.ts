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

export const GET_TASK_EVENTS = gql`
    query getTaskEvents($id: ID!) {
        getTaskEvents(id: $id) {
            event_id
            task_id
            field_changed
            old_value
            new_value
            updated_at
        }
    }
`