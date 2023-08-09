import { gql } from '@apollo/client'

export const CREATE_PROJECT = gql`
    mutation createProject($input: CreateProjectInput!) {
        createProject(input: $input) {
            id
            owner
            title
            description
            created_at
        }
    }
`

export const UPDATE_PROJECT = gql`
  mutation updateProject($input: UpdateProjectInput!) {
    updateTask(input: $input) {
        id
        owner
        title
        description
        members
        created_at
    }
  }
`

export const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!) {
        deleteProject(id: $id) {
            message
        }
    }
`