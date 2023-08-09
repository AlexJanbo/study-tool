import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../features/auth/AuthContext';
import { GET_TASK } from '../../features/tasks/taskQueries';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_TASK } from '../../features/tasks/taskMutations';
var PriorityTypes;
(function (PriorityTypes) {
    PriorityTypes["High"] = "High";
    PriorityTypes["Medium"] = "Medium";
    PriorityTypes["Low"] = "Low";
})(PriorityTypes || (PriorityTypes = {}));
var StatusTypes;
(function (StatusTypes) {
    StatusTypes["Created"] = "Created";
    StatusTypes["InProgress"] = "InProgress";
    StatusTypes["Completed"] = "Completed";
})(StatusTypes || (StatusTypes = {}));
export default function EditTaskForm() {
    const { taskId } = useParams();
    const navigate = useNavigate();
    if (!taskId) {
        throw new Error("Task id not found");
    }
    const { token } = useContext(AuthContext);
    const { data, loading, error, } = useQuery(GET_TASK, {
        variables: { id: taskId },
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    });
    const [updateTask] = useMutation(UPDATE_TASK, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    });
    const [editTaskInput, setEditTaskInput] = useState({
        id: taskId,
        title: data.getTask.title,
        description: data.getTask.description,
        priority: data.getTask.priority,
        status: data.getTask.status,
        deadline: data.getTask.deadline
    });
    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setEditTaskInput((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleUpdateTask = () => {
        if (!token) {
            throw new Error("Invalid token");
        }
        updateTask({ variables: { id: taskId, input: editTaskInput } });
        navigate(`/tasks/${taskId}`);
    };
    if (!editTaskInput.title || !editTaskInput.description || !editTaskInput.priority || !editTaskInput.status) {
        return React.createElement("div", null, "Loading");
    }
    if (loading)
        return React.createElement("div", null, "Loading");
    if (error)
        return React.createElement("div", null, "Error");
    return (React.createElement(Box, null,
        React.createElement(FormControl, { variant: "standard" },
            React.createElement(TextField, { id: "title", label: "Title", variant: "outlined", type: "text", name: "title", value: editTaskInput.title, onChange: handleChangeInput }),
            React.createElement(TextField, { id: "description", label: "Description", variant: "outlined", type: "text", name: "description", value: editTaskInput.description, onChange: handleChangeInput }),
            React.createElement(FormControl, null,
                React.createElement(FormLabel, { style: { textAlign: "center" } }, "Priority"),
                React.createElement(RadioGroup, { row: true, value: editTaskInput.priority, name: "priority", onChange: handleChangeInput },
                    React.createElement(FormControlLabel, { value: PriorityTypes.Low, control: React.createElement(Radio, null), label: "Low" }),
                    React.createElement(FormControlLabel, { value: PriorityTypes.Medium, control: React.createElement(Radio, null), label: "Medium" }),
                    React.createElement(FormControlLabel, { value: PriorityTypes.High, control: React.createElement(Radio, null), label: "High" }))),
            React.createElement(FormControl, null,
                React.createElement(FormLabel, { style: { textAlign: "center" } }, "Status"),
                React.createElement(RadioGroup, { row: true, value: editTaskInput.status, name: "status", onChange: handleChangeInput },
                    React.createElement(FormControlLabel, { value: StatusTypes.Completed, control: React.createElement(Radio, null), label: "Completed" }),
                    React.createElement(FormControlLabel, { value: StatusTypes.InProgress, control: React.createElement(Radio, null), label: "In Progress" }),
                    React.createElement(FormControlLabel, { value: StatusTypes.Created, control: React.createElement(Radio, null), label: "Created" }))),
            React.createElement(FormControl, null,
                React.createElement("input", { type: "datetime-local", id: "deadline", name: "deadline", value: editTaskInput.deadline, onChange: handleChangeInput })),
            React.createElement(Button, { type: "submit", onClick: handleUpdateTask }, "Edit Task!"))));
}
