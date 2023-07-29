import { gql } from '@apollo/client'

export const GET_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            username
            email
        }
    }
`

export const GET_USER_DETAILS = gql`
    query GetUserDetails($id: ID!) {
        user(id: $id) {
            id
            username
            email
            // other fields as needed
        }
    }
`