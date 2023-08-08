import * as React from 'react';
import TaskDetailsCard from '../../components/viewTasks/TaskDetailsCard';
import ViewTaskBreadcrumbs from '../../components/viewTasks/ViewTaskBreadcrumbs';

export default function ViewTask() {


  return (
    <>
      <ViewTaskBreadcrumbs />
      <TaskDetailsCard />
    </>
  );
}