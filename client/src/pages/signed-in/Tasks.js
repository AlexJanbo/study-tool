import * as React from 'react';
import TaskTable from '../../components/tasks/TaskTable';
import TaskFormModal from '../../components/tasks/TaskFormModal';
export default function Tasks() {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, aperiam!"),
        React.createElement(TaskTable, null),
        React.createElement(TaskFormModal, null)));
}
