import * as React from 'react';
import ProjectDetailsCard from '../../components/viewProjects/ProjectDetailsCard';
import { Stack } from '@mui/material';
import AddProjectMembersModal from '../../components/viewProjects/AddProjectMembersModal';
// import ViewTaskBreadcrumbs from '../../components/viewTasks/ViewTaskBreadcrumbs';
export default function ViewProject() {
    return (React.createElement(React.Fragment, null,
        React.createElement(Stack, { direction: "column" },
            React.createElement(AddProjectMembersModal, null),
            React.createElement(ProjectDetailsCard, null))));
}
