import * as React from 'react';
import ProjectDetailsCard from '../../components/viewProjects/ProjectDetailsCard';
import { Stack } from '@mui/material';
import AddProjectMembersModal from '../../components/viewProjects/AddProjectMembersModal';
import ViewProjectBreadcrumbs from '../../components/viewProjects/ViewProjectBreadcrumbs';
// import ViewTaskBreadcrumbs from '../../components/viewTasks/ViewTaskBreadcrumbs';

export default function ViewProject() {


  return (
    <>
      {/* <ViewTaskBreadcrumbs /> */}
      <Stack direction="column">
        <ViewProjectBreadcrumbs />
        <AddProjectMembersModal />
        <ProjectDetailsCard />
      </Stack>
    </>
  );
}