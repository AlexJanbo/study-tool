import * as React from 'react';
import EditTaskForm from '../../components/editTasks/EditTaskForm';
import EditTaskBreadcrumbs from '../../components/editTasks/EditTaskBreadcrumbs';
export default function EditTask() {
    return (React.createElement(React.Fragment, null,
        React.createElement(EditTaskBreadcrumbs, null),
        React.createElement(EditTaskForm, null)));
}
