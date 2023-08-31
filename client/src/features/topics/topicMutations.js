import { gql } from '@apollo/client';
export const CREATE_TOPIC = gql `
    mutation createTopic($input: CreateTopicInput!) {
        createTopic(input: $input) {
            topic_id
            title
        }
    }
`;
// export const UPDATE_TASK = gql`
//   mutation updateTask($input: UpdateTaskInput!) {
//     updateTask(input: $input) {
//       id
//       title
//       description
//       priority
//       status
//       deadline
//       created_at
//     }
//   }
// `
export const DELETE_TOPIC = gql `
    mutation deleteTopic($id: ID!) {
        deleteTopic(id: $id) {
            message
        }
    }
`;
