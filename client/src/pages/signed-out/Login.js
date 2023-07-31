import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LOGIN_USER } from '../../features/auth/userMutations';
import { useMutation } from '@apollo/client';
import { setAuthToken } from '../../utils';
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
export default function Login() {
    const [userInput, setUserInput] = useState({ email: '', password: '' });
    const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);
    console.log(data);
    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setUserInput((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleLogin = (event) => {
        event.preventDefault();
        loginUser({ variables: { input: userInput } });
        if (error) {
            throw new Error("Login failed");
        }
        setAuthToken(data);
    };
    return (React.createElement(ThemeProvider, { theme: defaultTheme },
        React.createElement(Grid, { container: true, component: "main", sx: { height: '100vh' } },
            React.createElement(CssBaseline, null),
            React.createElement(Grid, { item: true, xs: false, sm: 4, md: 7, sx: {
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                } }),
            React.createElement(Grid, { item: true, xs: 12, sm: 8, md: 5, component: Paper, elevation: 6, square: true },
                React.createElement(Box, { sx: {
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    } },
                    React.createElement(Avatar, { sx: { m: 1, bgcolor: 'secondary.main' } },
                        React.createElement(LockOutlinedIcon, null)),
                    React.createElement(Typography, { component: "h1", variant: "h5" }, "Sign in"),
                    React.createElement(Box, { component: "form", noValidate: true, onSubmit: handleLogin, sx: { mt: 1 } },
                        React.createElement(TextField, { margin: "normal", required: true, fullWidth: true, id: "email", label: "Email Address", name: "email", autoComplete: "email", autoFocus: true, value: userInput.email, onChange: handleChangeInput }),
                        React.createElement(TextField, { margin: "normal", required: true, fullWidth: true, name: "password", label: "Password", type: "password", id: "password", autoComplete: "current-password", value: userInput.password, onChange: handleChangeInput }),
                        React.createElement(FormControlLabel, { control: React.createElement(Checkbox, { value: "remember", color: "primary" }), label: "Remember me" }),
                        React.createElement(Button, { type: "submit", fullWidth: true, variant: "contained", sx: { mt: 3, mb: 2 } }, "Sign In"),
                        React.createElement(Grid, { container: true },
                            React.createElement(Grid, { item: true, xs: true },
                                React.createElement(Link, { href: "#", variant: "body2" }, "Forgot password?")),
                            React.createElement(Grid, { item: true },
                                React.createElement(Link, { href: "#", variant: "body2" }, "Don't have an account? Sign Up"))),
                        React.createElement(Copyright, { sx: { mt: 5 } })))))));
}
