import * as React from 'react';
import CreateTask from '../../features/tasks/createTask';
export default function Dashboard() {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null, "Dashboard: Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, aperiam!"),
        React.createElement(CreateTask, null)));
}
