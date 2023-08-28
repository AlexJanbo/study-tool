import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}
export default function EditProjectBreadcrumbs() {
    const { projectId } = useParams();
    return (React.createElement(Grid, { p: 1, m: 2, sx: { marginTop: "5%", marginLeft: "5%" } },
        React.createElement("div", { role: "presentation", onClick: handleClick },
            React.createElement(Breadcrumbs, { "aria-label": "breadcrumb", sx: { color: "white" } },
                React.createElement(Link, { to: '/projects', style: { textDecoration: "none" } },
                    React.createElement(Typography, { sx: { color: "white" } }, "Back to Projects")),
                React.createElement(Link, { to: `/projects/${projectId}`, style: { textDecoration: "none" } },
                    React.createElement(Typography, { sx: { color: "white" } }, "View Project")),
                React.createElement(Link, { to: `/projects/edit/${projectId}`, style: { textDecoration: "none" } },
                    React.createElement(Typography, { sx: { color: "white" } }, "Edit Project"))))));
}
