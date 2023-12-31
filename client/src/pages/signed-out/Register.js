import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AddUser } from '../../features/auth/AddUser';
function Copyright(props) {
    return (React.createElement(Typography, Object.assign({ variant: "body2", color: "text.secondary", align: "center" }, props),
        'Copyright © ',
        React.createElement(Link, { color: "inherit", href: "https://mui.com/" }, "Your Website"),
        ' ',
        new Date().getFullYear(),
        '.'));
}
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
export default function Register() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };
    return (React.createElement(ThemeProvider, { theme: defaultTheme },
        React.createElement(Container, { component: "main", maxWidth: "xs" },
            React.createElement(CssBaseline, null),
            React.createElement(Box, { sx: {
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                } },
                React.createElement(Avatar, { sx: { m: 1, bgcolor: 'secondary.main' } },
                    React.createElement(LockOutlinedIcon, null)),
                React.createElement(Typography, { component: "h1", variant: "h5" }, "Sign up"),
                React.createElement(Box, { component: "form", noValidate: true, onSubmit: handleSubmit, sx: { mt: 3 } },
                    React.createElement(AddUser, null),
                    React.createElement(Button, { type: "submit", fullWidth: true, variant: "contained", sx: { mt: 3, mb: 2 } }, "Sign Up"),
                    React.createElement(Grid, { container: true, justifyContent: "flex-end" },
                        React.createElement(Grid, { item: true },
                            React.createElement(Link, { href: "#", variant: "body2" }, "Already have an account? Sign in"))))),
            React.createElement(Copyright, { sx: { mt: 5 } }))));
}
