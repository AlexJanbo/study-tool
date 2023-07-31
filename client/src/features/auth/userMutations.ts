import { gql } from '@apollo/client'

export const ADD_USER = gql`
    mutation addUser($input: UserInput!) {
        addUser(input: $input) {
            username
            email
            password
        }
    }
`

export const LOGIN_USER = gql`
    mutation loginUser($input: LoginCredentials!) {
        loginUser(input: $input) {
            token
        }
    }
`