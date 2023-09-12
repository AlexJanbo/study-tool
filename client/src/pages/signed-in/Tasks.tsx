import * as React from 'react';
import TaskTable from '../../components/tasks/TaskTable';
import TaskFormModal from '../../components/tasks/TaskFormModal';
import { Stack } from '@mui/material';

export default function Tasks() {


  return (
    <>
      <Stack direction="column">
        <TaskTable />
      </Stack>
    </>
  );
}