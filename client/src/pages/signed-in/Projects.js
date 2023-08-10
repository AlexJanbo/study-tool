import * as React from 'react';
import ProjectFormModal from '../../components/projects/ProjectFormModal';
import ProjectTable from '../../components/projects/ProjectTable';
import GroupProjectFormModal from '../../components/projects/GroupProjectFormModal';
export default function Projects() {
    return (React.createElement(React.Fragment, null,
        React.createElement(ProjectTable, null),
        React.createElement(ProjectFormModal, null),
        React.createElement(GroupProjectFormModal, null)));
}
