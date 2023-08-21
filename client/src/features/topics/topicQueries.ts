import { gql } from '@apollo/client'

export const GET_TOPICS_BY_USER = gql`
    query getTopicsByUser {
        getTopicsByUser {
            topic_id
            title
        }
    }
`

export const GET_TOPIC = gql`
    query getTopic($id: ID!) {
        getTopic(id: $id) {
            topic_id
            title
        }
    }
`