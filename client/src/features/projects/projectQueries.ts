import { gql } from '@apollo/client'

export const GET_PROJECTS_BY_USER = gql`
    query getProjectsByUser {
        getProjectsByUser {
            id
            owner
            title
            description
            members
            created_at
        }
    }
`

export const GET_PROJECT = gql`
    query getProject($id: ID!) {
        getProject(id: $id) {
            id
            owner
            title
            description
            members
            created_at
        }
    }
`