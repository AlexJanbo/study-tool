import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import TaskIcon from '@mui/icons-material/Task';
import WorkIcon from '@mui/icons-material/Work';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from 'react-router-dom';
export const mainListItems = (React.createElement(React.Fragment, null,
    React.createElement(Link, { to: "/dashboard" },
        React.createElement(ListItemButton, null,
            React.createElement(ListItemIcon, null,
                React.createElement(DashboardIcon, null)),
            React.createElement(ListItemText, { primary: "Dashboard" }))),
    React.createElement(Link, { to: "/study" },
        React.createElement(ListItemButton, null,
            React.createElement(ListItemIcon, null,
                React.createElement(AutoStoriesIcon, null)),
            React.createElement(ListItemText, { primary: "Study" }))),
    React.createElement(Link, { to: "/tasks" },
        React.createElement(ListItemButton, null,
            React.createElement(ListItemIcon, null,
                React.createElement(TaskIcon, null)),
            React.createElement(ListItemText, { primary: "Tasks" }))),
    React.createElement(Link, { to: "/projects" },
        React.createElement(ListItemButton, null,
            React.createElement(ListItemIcon, null,
                React.createElement(WorkIcon, null)),
            React.createElement(ListItemText, { primary: "Projects" })))));
export const secondaryListItems = (React.createElement(React.Fragment, null,
    React.createElement(Link, { to: "/profile" },
        React.createElement(ListItemButton, null,
            React.createElement(ListItemIcon, null,
                React.createElement(AccountBoxIcon, null)),
            React.createElement(ListItemText, { primary: "Profile" })))));
