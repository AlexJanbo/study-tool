import { gql } from '@apollo/client'

export const GET_COMMENTS_BY_TASK = gql`
    query getCommentsByTask {
        getCommentsByTask {
            comment_id
            task_id
            user_id
            description
            image
            created_at
        }
    }
`