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
const CustomLink = ({ to, icon: IconComponent, primary }) => (React.createElement(Link, { to: to, style: { textDecoration: 'none' } },
    React.createElement(ListItemButton, null,
        React.createElement(ListItemIcon, { sx: { color: "white" } },
            React.createElement(IconComponent, null)),
        React.createElement(ListItemText, { primary: primary, sx: { color: "white" } }))));
export const mainListItems = (React.createElement(React.Fragment, null,
    React.createElement(CustomLink, { to: "/dashboard", icon: DashboardIcon, primary: "Dashboard" }),
    React.createElement(CustomLink, { to: "/study", icon: AutoStoriesIcon, primary: "Study" }),
    React.createElement(CustomLink, { to: "/tasks", icon: TaskIcon, primary: "Tasks" }),
    React.createElement(CustomLink, { to: "/projects", icon: WorkIcon, primary: "Projects" })));
export const secondaryListItems = (React.createElement(React.Fragment, null,
    React.createElement(CustomLink, { to: "/profile", icon: AccountBoxIcon, primary: "Profile" })));
