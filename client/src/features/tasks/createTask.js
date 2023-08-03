import React, { useState, useContext } from 'react';
import { Box, FormControl, TextField, Button, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
// import jwt from 'jsonwebtoken'
import { useMutation } from '@apollo/client';
import { CREATE_TASK } from './taskMutations';
import { AuthContext } from '../auth/AuthContext';
// import { APP_SECRET } from '../../utils/index'
// import dotEnv from 'dotenv'
// dotEnv.config()
// const APP_SECRET: string = process.env.APP_SECRET || ''
var PriorityTypes;
(function (PriorityTypes) {
    PriorityTypes["High"] = "High";
    PriorityTypes["Medium"] = "Medium";
    PriorityTypes["Low"] = "Low";
})(PriorityTypes || (PriorityTypes = {}));
var StatusTypes;
(function (StatusTypes) {
    StatusTypes["Created"] = "Created";
    StatusTypes["InProgress"] = "In-progress";
    StatusTypes["Completed"] = "Completed";
})(StatusTypes || (StatusTypes = {}));
function CreateTask() {
    const [userInput, setUserInput] = useState({ title: '', description: '', priority: PriorityTypes.Low, status: StatusTypes.Created });
    const [createTask] = useMutation(CREATE_TASK);
    const { token } = useContext(AuthContext);
    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setUserInput((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleCreateTask = (event) => {
        event.preventDefault();
        if (!token) {
            throw new Error("Invalid token");
        }
        // const decoded = jwt.verify(token, APP_SECRET)
        // console.log(APP_SECRET)
        createTask({ variables: { input: userInput } });
    };
    return (React.createElement(Box, { component: "form", sx: {
            '& > :not(style)': { m: 1, width: '25ch' },
        }, noValidate: true, autoComplete: "off" },
        React.createElement(FormControl, { variant: "standard" },
            React.createElement(TextField, { id: "title", label: "Title", variant: "outlined", type: "text", name: "title", value: userInput.title, onChange: handleChangeInput }),
            React.createElement(TextField, { id: "description", label: "Description", variant: "outlined", type: "text", name: "description", value: userInput.description, onChange: handleChangeInput }),
            React.createElement(FormControl, null,
                React.createElement(FormLabel, { style: { textAlign: "center" } }, "Priority"),
                React.createElement(RadioGroup, { row: true, value: userInput.priority, name: "priority", onChange: handleChangeInput },
                    React.createElement(FormControlLabel, { value: PriorityTypes.Low, control: React.createElement(Radio, null), label: "Low" }),
                    React.createElement(FormControlLabel, { value: PriorityTypes.Medium, control: React.createElement(Radio, null), label: "Medium" }),
                    React.createElement(FormControlLabel, { value: PriorityTypes.High, control: React.createElement(Radio, null), label: "High" }))),
            React.createElement(Button, { type: "submit", onClick: handleCreateTask }, "Sign Up!"))));
}
export default CreateTask;
