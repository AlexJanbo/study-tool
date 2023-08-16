import * as React from 'react';
import TaskDetailsCard from '../../components/viewTasks/TaskDetailsCard';
import ViewTaskBreadcrumbs from '../../components/viewTasks/ViewTaskBreadcrumbs';
import { Stack } from '@mui/material';
import TaskHistoryTable from '../../components/viewTasks/TaskHistoryTable';
import TaskCommentTable from '../../components/viewTasks/TaskCommentTable';
import CreateCommentModal from '../../components/viewTasks/CreateCommentModal';
export default function ViewTask() {
    return (React.createElement(React.Fragment, null,
        React.createElement(Stack, { direction: "column", spacing: 2 },
            React.createElement(ViewTaskBreadcrumbs, null),
            React.createElement(TaskDetailsCard, null),
            React.createElement(TaskHistoryTable, null),
            React.createElement(TaskCommentTable, null),
            React.createElement(CreateCommentModal, null))));
}
