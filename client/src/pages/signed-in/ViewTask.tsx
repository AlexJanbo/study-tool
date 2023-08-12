import * as React from 'react';
import TaskDetailsCard from '../../components/viewTasks/TaskDetailsCard';
import ViewTaskBreadcrumbs from '../../components/viewTasks/ViewTaskBreadcrumbs';
import { Stack } from '@mui/material';
import TaskHistoryTable from '../../components/viewTasks/TaskHistoryTable';

export default function ViewTask() {


  return (
    <>
      <Stack direction="column" spacing={2}>
        <ViewTaskBreadcrumbs />
        <TaskDetailsCard />
        <TaskHistoryTable />
      </Stack>
    </>
  );
}