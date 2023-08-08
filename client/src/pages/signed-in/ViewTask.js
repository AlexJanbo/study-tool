import * as React from 'react';
import TaskDetailsCard from '../../components/viewTasks/TaskDetailsCard';
import ViewTaskBreadcrumbs from '../../components/viewTasks/ViewTaskBreadcrumbs';
export default function ViewTask() {
    return (React.createElement(React.Fragment, null,
        React.createElement(ViewTaskBreadcrumbs, null),
        React.createElement(TaskDetailsCard, null)));
}
