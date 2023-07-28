import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ADD_USER } from './userMutations';
import { Box, Button, FormControl, TextField } from '@mui/material';
export const AddUser = () => {
    const [userInput, setUserInput] = useState({ name: '', email: '', password: '' });
    const [addUser, { data, loading, error }] = useMutation(ADD_USER);
    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setUserInput((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleRegistration = (event) => {
        event.preventDefault();
        console.log(addUser({ variables: { input: userInput } }));
    };
    return (React.createElement(Box, { component: "form", sx: {
            '& > :not(style)': { m: 1, width: '25ch' },
        }, noValidate: true, autoComplete: "off" },
        React.createElement(FormControl, { variant: "standard" },
            React.createElement(TextField, { id: "name", label: "Name", variant: "outlined", type: "text", name: "name", value: userInput.name, onChange: handleChangeInput }),
            React.createElement(TextField, { id: "email", label: "Email", variant: "outlined", type: "text", name: "email", value: userInput.email, onChange: handleChangeInput }),
            React.createElement(TextField, { id: "password", label: "Password", variant: "outlined", type: "password", name: "password", value: userInput.password, onChange: handleChangeInput }),
            React.createElement(Button, { type: "submit", onClick: handleRegistration }, "Sign Up!"))));
};
