import * as React from 'react';
import TaskTable from '../../components/tasks/TaskTable';
import { Stack } from '@mui/material';
export default function Tasks() {
    return (React.createElement(React.Fragment, null,
        React.createElement(Stack, { direction: "column" },
            React.createElement(TaskTable, null))));
}
