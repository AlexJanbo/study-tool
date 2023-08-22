import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from '../components/dashboard/ListItems';
// import Chart from '../../components/dashboard/Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
function Copyright(props) {
    return (React.createElement(Typography, Object.assign({ variant: "body2", color: "text.secondary", align: "center" }, props),
        'Copyright © ',
        React.createElement(Link, { color: "inherit", href: "https://mui.com/" }, "Your Website"),
        ' ',
        new Date().getFullYear(),
        '.'));
}
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => (Object.assign({ zIndex: theme.zIndex.drawer + 1, transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }) }, (open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
}))));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    '& .MuiDrawer-paper': Object.assign({ position: 'relative', whiteSpace: 'nowrap', backgroundColor: "#2f3136", width: drawerWidth, transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }), boxSizing: 'border-box' }, (!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    })),
}));
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
export const Layout = ({ children }) => {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    // Get the name of current page in order to display heading
    let componentName;
    if (React.isValidElement(children)) {
        componentName = children && children.type && children.type.name;
    }
    console.log(componentName);
    return (React.createElement(ThemeProvider, { theme: defaultTheme },
        React.createElement(Box, { sx: { display: 'flex' } },
            React.createElement(CssBaseline, null),
            React.createElement(AppBar, { position: "absolute", open: open, sx: { backgroundColor: "#2f3136" } },
                React.createElement(Toolbar, { sx: {
                        pr: '24px', // keep right padding when drawer closed
                    } },
                    React.createElement(IconButton, { edge: "start", color: "inherit", "aria-label": "open drawer", onClick: toggleDrawer, sx: Object.assign({ marginRight: '36px' }, (open && { display: 'none' })) },
                        React.createElement(MenuIcon, null)),
                    React.createElement(Typography, { component: "h1", variant: "h6", color: "inherit", noWrap: true, sx: { flexGrow: 1 } }, componentName),
                    React.createElement(IconButton, { color: "inherit" },
                        React.createElement(Badge, { badgeContent: 4, color: "secondary" },
                            React.createElement(NotificationsIcon, null))))),
            React.createElement(Drawer, { variant: "permanent", open: open },
                React.createElement(Toolbar, { sx: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    } },
                    React.createElement(IconButton, { onClick: toggleDrawer, sx: { color: "white" } },
                        React.createElement(ChevronLeftIcon, null))),
                React.createElement(Divider, null),
                React.createElement(List, { component: "nav" },
                    mainListItems,
                    React.createElement(Divider, { sx: { my: 1 } }),
                    secondaryListItems)),
            React.createElement(Box, { component: "main", sx: {
                    // backgroundColor: (theme) =>
                    //   theme.palette.mode === 'light'
                    //     ? theme.palette.grey[100]
                    //     : theme.palette.grey[900],
                    backgroundColor: "#202225",
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                } },
                React.createElement(Toolbar, null),
                React.createElement(Container, { maxWidth: "lg", sx: { padding: 0, margin: 0 } },
                    React.createElement(Grid, { container: true, spacing: 2 }, children),
                    React.createElement(Copyright, { sx: { pt: 4 } }))))));
};
