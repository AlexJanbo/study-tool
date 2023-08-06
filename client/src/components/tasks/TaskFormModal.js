import React, { useState, useContext } from 'react';
import { Box, Button, Modal, FormControl, TextField, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
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
    bgcolor: 'background.paper',
    border: '2px solid #000',
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
    };
    return (React.createElement("div", null,
        React.createElement(Button, { onClick: handleOpen }, "Create a new Task!"),
        React.createElement(Modal, { open: open, onClose: handleClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" },
            React.createElement(Box, { sx: style },
                React.createElement(FormControl, { variant: "standard" },
                    React.createElement(TextField, { id: "title", label: "Title", variant: "outlined", type: "text", name: "title", value: taskInput.title, onChange: handleChangeInput }),
                    React.createElement(TextField, { id: "description", label: "Description", variant: "outlined", type: "text", name: "description", value: taskInput.description, onChange: handleChangeInput }),
                    React.createElement(FormControl, null,
                        React.createElement(FormLabel, { style: { textAlign: "center" } }, "Priority"),
                        React.createElement(RadioGroup, { row: true, value: taskInput.priority, name: "priority", onChange: handleChangeInput },
                            React.createElement(FormControlLabel, { value: PriorityTypes.Low, control: React.createElement(Radio, null), label: "Low" }),
                            React.createElement(FormControlLabel, { value: PriorityTypes.Medium, control: React.createElement(Radio, null), label: "Medium" }),
                            React.createElement(FormControlLabel, { value: PriorityTypes.High, control: React.createElement(Radio, null), label: "High" }))),
                    React.createElement(Button, { type: "submit", onClick: handleCreateTask }, "Create Task!"))))));
}
