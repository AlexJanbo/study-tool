import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useParams } from 'react-router-dom';
function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}
export default function ViewTaskBreadcrumbs() {
    const { taskId } = useParams();
    return (React.createElement("div", { role: "presentation", onClick: handleClick },
        React.createElement(Breadcrumbs, { "aria-label": "breadcrumb" },
            React.createElement(Link, { to: '/tasks' }, "Tasks"),
            React.createElement(Link, { to: `/tasks/${taskId}` },
                React.createElement(Typography, null, taskId)))));
}
