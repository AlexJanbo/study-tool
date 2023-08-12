import { gql } from '@apollo/client';
export const CREATE_TASK = gql `
    mutation createTask($input: CreateTaskInput!) {
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
`;
export const UPDATE_TASK = gql `
  mutation updateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      title
      description
      priority
      status
      deadline
      created_at
    }
  }
`;
export const UPDATE_TASK_TITLE = gql `
  mutation updateTaskTitle($input: UpdateTaskTitleInput!) {
    updateTaskTitle(input: $input) {
      id
      title
    }
  }
`;
export const UPDATE_TASK_DESCRIPTION = gql `
  mutation updateTaskDescription($input: UpdateTaskDescriptionInput!) {
    updateTaskDescription(input: $input) {
      id
      description
    }
  }
`;
export const UPDATE_TASK_PRIORITY = gql `
  mutation updateTaskPriority($input: UpdateTaskPriorityInput!) {
    updateTaskPriority(input: $input) {
      id
      priority
    }
  }
`;
export const UPDATE_TASK_STATUS = gql `
  mutation updateTaskStatus($input: UpdateTaskStatusInput!) {
    updateTaskStatus(input: $input) {
      id
      status
    }
  }
`;
export const UPDATE_TASK_DEADLINE = gql `
  mutation updateTaskDeadline($input: UpdateTaskDeadlineInput!) {
    updateTaskDeadline(input: $input) {
      id
      deadline
    }
  }
`;
export const DELETE_TASK = gql `
    mutation deleteTask($id: ID!) {
        deleteTask(id: $id) {
            message
        }
    }
`;
