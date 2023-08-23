import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../features/auth/AuthContext';
import { GET_TASK } from '../../features/tasks/taskQueries';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_TASK, UPDATE_TASK_DEADLINE, UPDATE_TASK_DESCRIPTION, UPDATE_TASK_PRIORITY, UPDATE_TASK_STATUS, UPDATE_TASK_TITLE } from '../../features/tasks/taskMutations';
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
    const [updateTaskTitle] = useMutation(UPDATE_TASK_TITLE, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    });
    const [updateTaskDescription] = useMutation(UPDATE_TASK_DESCRIPTION, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    });
    const [updateTaskPriority] = useMutation(UPDATE_TASK_PRIORITY, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    });
    const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    });
    const [updateTaskDeadline] = useMutation(UPDATE_TASK_DEADLINE, {
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
    const handleUpdateTaskTitle = () => {
        if (!token) {
            throw new Error("Invalid token");
        }
        updateTaskTitle({ variables: { input: { id: taskId, title: editTaskInput.title } } });
    };
    const handleUpdateTaskDescription = () => {
        if (!token) {
            throw new Error("Invalid token");
        }
        updateTaskDescription({ variables: { input: { id: taskId, description: editTaskInput.description } } });
    };
    const handleUpdateTaskPriority = () => {
        if (!token) {
            throw new Error("Invalid token");
        }
        updateTaskPriority({ variables: { input: { id: taskId, priority: editTaskInput.priority } } });
    };
    const handleUpdateTaskStatus = () => {
        if (!token) {
            throw new Error("Invalid token");
        }
        updateTaskStatus({ variables: { input: { id: taskId, status: editTaskInput.status } } });
    };
    const handleUpdateTaskDeadline = () => {
        if (!token) {
            throw new Error("Invalid token");
        }
        updateTaskDeadline({ variables: { input: { id: taskId, deadline: editTaskInput.deadline } } });
    };
    if (!editTaskInput.title || !editTaskInput.description || !editTaskInput.priority || !editTaskInput.status) {
        return React.createElement("div", null, "Loading");
    }
    if (loading)
        return React.createElement("div", null, "Loading");
    if (error)
        return React.createElement("div", null, "Error");
    return (React.createElement(Card, { style: { maxWidth: 400, border: "1px solid white", borderRadius: "2%", marginLeft: "5%", backgroundColor: "#43454a" } },
        React.createElement(CardContent, null,
            React.createElement(Grid, { container: true, m: 1, sx: { display: "flex", flexDirection: "column", justifyItems: "space-evenly", alignItems: "center" } },
                React.createElement(Grid, { item: true, xs: 12 },
                    React.createElement(TextField, { id: "title", variant: "outlined", label: "Title", type: "text", name: "title", value: editTaskInput.title, onChange: handleChangeInput, sx: { color: "white" }, InputLabelProps: { style: { color: "white" } }, InputProps: { inputProps: { style: { color: 'white' } } } }),
                    React.createElement(Button, { onClick: handleUpdateTaskTitle }, "Set Title")),
                React.createElement(Grid, { item: true, xs: 12, sx: { marginTop: "2%" } },
                    React.createElement(TextField, { id: "description", label: "Description", variant: "outlined", type: "text", name: "description", value: editTaskInput.description, onChange: handleChangeInput, InputLabelProps: { style: { color: "white" } }, InputProps: { inputProps: { style: { color: 'white' } } } }),
                    React.createElement(Button, { onClick: handleUpdateTaskDescription }, "Set Description")),
                React.createElement(Grid, { item: true, xs: 12 },
                    React.createElement(FormControl, null,
                        React.createElement(FormLabel, { style: { textAlign: "center", color: "white" } }, "Priority"),
                        React.createElement(RadioGroup, { row: true, value: editTaskInput.priority, name: "priority", onChange: handleChangeInput },
                            React.createElement(FormControlLabel, { sx: { color: "white" }, value: PriorityTypes.Low, control: React.createElement(Radio, null), label: "Low" }),
                            React.createElement(FormControlLabel, { sx: { color: "white" }, value: PriorityTypes.Medium, control: React.createElement(Radio, null), label: "Medium" }),
                            React.createElement(FormControlLabel, { sx: { color: "white" }, value: PriorityTypes.High, control: React.createElement(Radio, null), label: "High" })),
                        React.createElement(Button, { onClick: handleUpdateTaskPriority }, "Set Priority"))),
                React.createElement(Grid, { item: true, xs: 12 },
                    React.createElement(FormControl, null,
                        React.createElement(FormLabel, { style: { textAlign: "center", color: "white" } }, "Status"),
                        React.createElement(RadioGroup, { row: true, value: editTaskInput.status, name: "status", onChange: handleChangeInput },
                            React.createElement(FormControlLabel, { sx: { color: "white" }, value: StatusTypes.Completed, control: React.createElement(Radio, null), label: "Completed" }),
                            React.createElement(FormControlLabel, { sx: { color: "white" }, value: StatusTypes.InProgress, control: React.createElement(Radio, null), label: "In Progress" }),
                            React.createElement(FormControlLabel, { sx: { color: "white" }, value: StatusTypes.Created, control: React.createElement(Radio, null), label: "Created" })),
                        React.createElement(Button, { onClick: handleUpdateTaskStatus }, "Set Status"))),
                React.createElement(Grid, { item: true, xs: 12 },
                    React.createElement(FormControl, null,
                        React.createElement("input", { type: "datetime-local", id: "deadline", name: "deadline", value: editTaskInput.deadline, onChange: handleChangeInput })),
                    React.createElement(Button, { onClick: handleUpdateTaskDeadline }, "Set Deadline"))))));
}
