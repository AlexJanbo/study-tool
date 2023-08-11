import * as React from 'react';
import TaskDetailsCard from '../../components/viewTasks/TaskDetailsCard';
import ViewTaskBreadcrumbs from '../../components/viewTasks/ViewTaskBreadcrumbs';
import { Stack } from '@mui/material';
export default function ViewTask() {
    return (React.createElement(React.Fragment, null,
        React.createElement(Stack, { direction: "column", spacing: 2 },
            React.createElement(ViewTaskBreadcrumbs, null),
            React.createElement(TaskDetailsCard, null))));
}
