import React, { useState, useContext } from 'react';
import { Box, Button, Modal, FormControl, TextField, FormLabel, RadioGroup, FormControlLabel, Radio, Grid } from '@mui/material';
import { AuthContext } from '../../features/auth/AuthContext';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TASK } from '../../features/tasks/taskMutations';
import { GET_TASKS_BY_USER } from '../../features/tasks/taskQueries';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    borderRadius: "2%",
    backgroundColor: "#373c43",
    boxShadow: 24,
    p: 4,
};
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
export default function TaskFormModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [taskInput, setTaskInput] = useState({ title: '', description: '', priority: PriorityTypes.Low, status: StatusTypes.Created });
    const { token } = useContext(AuthContext);
    const [createTask] = useMutation(CREATE_TASK, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            },
        },
        onCompleted: () => {
            refetchTasks();
            handleClose();
        },
        onError: (error) => {
            console.log(error);
        }
    });
    const { refetch: refetchTasks } = useQuery(GET_TASKS_BY_USER, {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            },
        },
    });
    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setTaskInput((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleCreateTask = (event) => {
        event.preventDefault();
        if (!token) {
            throw new Error("Invalid token");
        }
        // const decoded = jwt.verify(token, APP_SECRET)
        // console.log(APP_SECRET)
        createTask({ variables: { input: taskInput } });
        setTaskInput({
            title: "",
            description: "",
            priority: PriorityTypes.Low,
            status: StatusTypes.Created,
        });
    };
    return (React.createElement(Grid, { p: 0, sx: { marginTop: "3%", width: "15vw" } },
        React.createElement(Button, { onClick: handleOpen, sx: {
                margin: 3,
                color: "white",
                backgroundColor: "#676767",
                border: "1px solid black",
                borderRadius: "10px",
                '&:hover': {
                    backgroundColor: "#a9f6ae",
                    color: "black"
                }
            } }, "Create a New Task!"),
        React.createElement(Modal, { open: open, onClose: handleClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" },
            React.createElement(Box, { sx: style },
                React.createElement(Grid, { sx: { display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" } },
                    React.createElement(FormControl, { variant: "standard" },
                        React.createElement(TextField, { id: "title", label: "Title", variant: "outlined", type: "text", name: "title", value: taskInput.title, onChange: handleChangeInput, InputLabelProps: { style: { color: "white" } }, InputProps: { inputProps: { style: { color: 'white' } } }, sx: { backgroundColor: "#43454a" } }),
                        React.createElement(TextField, { id: "description", label: "Description", variant: "outlined", type: "text", name: "description", value: taskInput.description, onChange: handleChangeInput, InputLabelProps: { style: { color: "white" } }, InputProps: { inputProps: { style: { color: 'white' } } }, sx: { backgroundColor: "#43454a", marginTop: "2%" } }),
                        React.createElement(FormControl, null,
                            React.createElement(FormLabel, { style: { textAlign: "center", color: "white", marginTop: "2%" } }, "Priority"),
                            React.createElement(RadioGroup, { row: true, value: taskInput.priority, name: "priority", onChange: handleChangeInput },
                                React.createElement(FormControlLabel, { sx: { color: "white" }, value: PriorityTypes.Low, control: React.createElement(Radio, null), label: "Low" }),
                                React.createElement(FormControlLabel, { sx: { color: "white" }, value: PriorityTypes.Medium, control: React.createElement(Radio, null), label: "Medium" }),
                                React.createElement(FormControlLabel, { sx: { color: "white" }, value: PriorityTypes.High, control: React.createElement(Radio, null), label: "High" }))),
                        React.createElement(Button, { type: "submit", onClick: handleCreateTask, sx: {
                                margin: 3,
                                color: "white",
                                backgroundColor: "#676767",
                                border: "1px solid white",
                                borderRadius: "10px",
                                '&:hover': {
                                    backgroundColor: "#a9f6ae",
                                    color: "black"
                                }
                            } }, "Create Task!")))))));
}
