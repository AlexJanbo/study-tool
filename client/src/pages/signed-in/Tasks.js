import * as React from 'react';
import TaskTable from '../../components/tasks/TaskTable';
import TaskFormModal from '../../components/tasks/TaskFormModal';
export default function Tasks() {
    return (React.createElement(React.Fragment, null,
        React.createElement(TaskFormModal, null),
        React.createElement(TaskTable, null)));
}
