import * as React from 'react';
import TaskDetailsCard from '../../components/viewTasks/TaskDetailsCard';
import ViewTaskBreadcrumbs from '../../components/viewTasks/ViewTaskBreadcrumbs';
import { Stack } from '@mui/material';
import TaskHistoryTable from '../../components/viewTasks/TaskHistoryTable';
import TaskCommentTable from '../../components/viewTasks/TaskCommentTable';
import CreateCommentModal from '../../components/viewTasks/CreateCommentModal';

export default function ViewTask() {


  return (
    <>
      <Stack direction="column" spacing={2}>
        <ViewTaskBreadcrumbs />
        <Stack direction="row">
          <TaskDetailsCard />
          <TaskCommentTable />
        </Stack>
        <TaskHistoryTable />
        <CreateCommentModal />
      </Stack>
    </>
  );
}