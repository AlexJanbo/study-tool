import * as React from 'react';
import EditTaskForm from '../../components/editTasks/EditTaskForm';
import EditTaskBreadcrumbs from '../../components/editTasks/EditTaskBreadcrumbs';
import { Stack } from '@mui/material';
export default function EditTask() {
    return (React.createElement(React.Fragment, null,
        React.createElement(Stack, { direction: "column", spacing: 2 },
            React.createElement(EditTaskBreadcrumbs, null),
            React.createElement(EditTaskForm, null))));
}
