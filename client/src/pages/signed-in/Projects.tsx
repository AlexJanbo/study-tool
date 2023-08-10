import * as React from 'react';
import ProjectFormModal from '../../components/projects/ProjectFormModal';
import ProjectTable from '../../components/projects/ProjectTable';
import GroupProjectFormModal from '../../components/projects/GroupProjectFormModal';

export default function Projects() {


  return (
    <>
      <ProjectTable />
      <ProjectFormModal />
      <GroupProjectFormModal />
    </>
  );
}