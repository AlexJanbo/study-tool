import * as React from 'react';
import TaskDetailsCard from '../../components/viewTasks/TaskDetailsCard';
import ViewTaskBreadcrumbs from '../../components/viewTasks/ViewTaskBreadcrumbs';
import { Stack } from '@mui/material';

export default function ViewTask() {


  return (
    <>
      <Stack direction="column" spacing={2}>
        <ViewTaskBreadcrumbs />
        <TaskDetailsCard />
      </Stack>
    </>
  );
}