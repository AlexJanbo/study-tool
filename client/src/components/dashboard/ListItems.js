import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';
export const mainListItems = (React.createElement(React.Fragment, null,
    React.createElement(Link, { to: "/dashboard" },
        React.createElement(ListItemButton, null,
            React.createElement(ListItemIcon, null,
                React.createElement(DashboardIcon, null)),
            React.createElement(ListItemText, { primary: "Dashboard" }))),
    React.createElement(Link, { to: '/profile' },
        React.createElement(ListItemButton, null,
            React.createElement(ListItemIcon, null,
                React.createElement(ShoppingCartIcon, null)),
            React.createElement(ListItemText, { primary: "Profile" }))),
    React.createElement(ListItemButton, null,
        React.createElement(ListItemIcon, null,
            React.createElement(PeopleIcon, null)),
        React.createElement(ListItemText, { primary: "Customers" })),
    React.createElement(ListItemButton, null,
        React.createElement(ListItemIcon, null,
            React.createElement(BarChartIcon, null)),
        React.createElement(ListItemText, { primary: "Reports" })),
    React.createElement(ListItemButton, null,
        React.createElement(ListItemIcon, null,
            React.createElement(LayersIcon, null)),
        React.createElement(ListItemText, { primary: "Integrations" }))));
export const secondaryListItems = (React.createElement(React.Fragment, null,
    React.createElement(ListSubheader, { component: "div", inset: true }, "Saved reports"),
    React.createElement(ListItemButton, null,
        React.createElement(ListItemIcon, null,
            React.createElement(AssignmentIcon, null)),
        React.createElement(ListItemText, { primary: "Current month" })),
    React.createElement(ListItemButton, null,
        React.createElement(ListItemIcon, null,
            React.createElement(AssignmentIcon, null)),
        React.createElement(ListItemText, { primary: "Last quarter" })),
    React.createElement(ListItemButton, null,
        React.createElement(ListItemIcon, null,
            React.createElement(AssignmentIcon, null)),
        React.createElement(ListItemText, { primary: "Year-end sale" }))));
