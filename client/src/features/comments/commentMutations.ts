import { gql } from '@apollo/client'

export const CREATE_COMMENT = gql`
    mutation createComment($input: CreateCommentInput!) {
        createComment(input: $input) {
            comment_id
            task_id
            user_id
            description
            image
            created_at
        }
    }
`

export const DELETE_COMMENT = gql`
    mutation deleteProject($id: ID!) {
        deleteProject(id: $id) {
            comment_id
            message
        }
    }
`