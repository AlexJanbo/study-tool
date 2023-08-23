import * as React from 'react';
import TaskTable from '../../components/tasks/TaskTable';
import TaskFormModal from '../../components/tasks/TaskFormModal';

export default function Tasks() {


  return (
    <>
      <TaskFormModal />
      <TaskTable />
    </>
  );
}