import * as React from 'react';
import EditTaskForm from '../../components/editTasks/EditTaskForm';
import EditTaskBreadcrumbs from '../../components/editTasks/EditTaskBreadcrumbs';
import { Stack } from '@mui/material';

export default function EditTask() {


  return (
    <>
      <Stack direction="column" spacing={2}>
        <EditTaskBreadcrumbs />
        <EditTaskForm />
      </Stack>
      {/* <GetTasks /> */}

    </>
  );
}