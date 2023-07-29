import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ADD_USER } from './userMutations';
import { Box, Button, FormControl, TextField } from '@mui/material';
export const AddUser = () => {
    const [userInput, setUserInput] = useState({ username: '', email: '', password: '' });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [addUser, { data, loading, error }] = useMutation(ADD_USER);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const passwordMatch = (password, confirmPassword) => {
        if (password === confirmPassword) {
            setConfirmPasswordError(false);
            return true;
        }
        else {
            setConfirmPasswordError(true);
            return false;
        }
    };
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            return false;
        }
        else {
            setEmailError(false);
            return true;
        }
    };
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError(true);
            return false;
        }
        else {
            setPasswordError(false);
            return true;
        }
    };
    const validateUsername = (username) => {
        if (username.length < 3 || username.length > 25) {
            setUsernameError(true);
            return false;
        }
        else {
            setUsernameError(false);
            return true;
        }
    };
    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
        else {
            setUserInput((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
        }
    };
    const handleRegistration = (event) => {
        event.preventDefault();
        if (passwordMatch(userInput.password, confirmPassword) &&
            validateEmail(userInput.email) &&
            validateUsername(userInput.username) &&
            validatePassword(userInput.password)) {
            addUser({ variables: { input: userInput } });
        }
    };
    return (React.createElement(Box, { component: "form", sx: {
            '& > :not(style)': { m: 1, width: '25ch' },
        }, noValidate: true, autoComplete: "off" },
        React.createElement(FormControl, { variant: "standard" },
            React.createElement(TextField, { id: "name", label: "Name", variant: "outlined", type: "text", name: "username", value: userInput.username, onChange: handleChangeInput, error: usernameError, helperText: usernameError ? "Please enter a valid username" : null }),
            React.createElement(TextField, { id: "email", label: "Email", variant: "outlined", type: "text", name: "email", value: userInput.email, onChange: handleChangeInput, error: emailError, helperText: emailError ? "Please enter a valid email" : null }),
            React.createElement(TextField, { id: "password", label: "Password", variant: "outlined", type: "password", name: "password", value: userInput.password, onChange: handleChangeInput, error: passwordError, helperText: passwordError ? "Please enter a valid email" : null }),
            React.createElement(TextField, { id: "confirm-password", label: "Confirm Password", variant: "outlined", type: "password", name: "confirmPassword", value: confirmPassword, onChange: handleChangeInput, error: confirmPasswordError, helperText: confirmPasswordError ? "Passwords do not match" : null }),
            React.createElement(Button, { type: "submit", onClick: handleRegistration }, "Sign Up!"))));
};
