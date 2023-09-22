import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../features/auth/AuthContext';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TASK } from '../../features/tasks/taskQueries';
import { DELETE_TASK } from '../../features/tasks/taskMutations';
import { formatDate } from '../../utils';
function TaskDetailsCard() {
    const { taskId } = useParams();
    const navigate = useNavigate();
    console.log(taskId);
    const { token } = useContext(AuthContext);
    const { data, loading, error, } = useQuery(GET_TASK, {
        variables: { id: taskId },
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    });
    const [deleteTask] = useMutation(DELETE_TASK, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    });
    if (loading)
        return React.createElement("div", null, "Loading");
    if (error)
        return React.createElement("div", null, "error");
    let title, description, priority, status, deadline, created_at;
    if (data.getTask) {
        ({ title, description, priority, status, deadline, created_at } = data.getTask);
    }
    console.log(created_at);
    const handleDeleteTask = () => {
        deleteTask({ variables: { id: taskId } })
            .then((result) => {
            console.log(result.data.deleteTask.message);
            navigate('/tasks');
        })
            .catch((error) => {
            console.log("Failed to delete task");
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Card, { style: { maxWidth: 400, border: "1px solid white", borderRadius: "5%", marginLeft: "5%", backgroundColor: "#43454a" } },
            React.createElement(CardContent, null,
                React.createElement(Grid, { container: true, spacing: 3, sx: { display: "flex", flexDirection: "column", justifyContent: "space-between" } },
                    React.createElement(Grid, { item: true, xs: 12 },
                        React.createElement(Typography, { variant: "h5", component: "h2", sx: { color: "white", textAlign: "center" } }, title)),
                    React.createElement(Grid, { item: true, xs: 12 },
                        React.createElement(Typography, { variant: "body1", component: "p", sx: { color: "white" } }, description)),
                    React.createElement(Grid, { item: true, xs: 6 },
                        React.createElement(Typography, { variant: "body2", color: "textSecondary", component: "p", sx: { color: "white" } },
                            "Status: ",
                            status)),
                    React.createElement(Grid, { item: true, xs: 6 },
                        React.createElement(Typography, { variant: "body2", color: "textSecondary", component: "p", sx: { color: "white" } },
                            "Priority: ",
                            priority)),
                    React.createElement(Grid, { item: true, xs: 12 },
                        React.createElement(Typography, { variant: "body2", color: "textSecondary", component: "p", sx: { color: "white" } },
                            "ID: ",
                            taskId)),
                    React.createElement(Grid, { item: true, xs: 12 },
                        React.createElement(Typography, { variant: "body2", color: "textSecondary", component: "p", sx: { color: "white" } },
                            "Created: ",
                            formatDate(created_at))),
                    deadline ?
                        React.createElement(Grid, { item: true, xs: 12 },
                            React.createElement(Typography, { variant: "body2", color: "textSecondary", component: "p", sx: { color: "white" } },
                                "Deadline: ",
                                formatDate(deadline)))
                        :
                            React.createElement(Grid, { item: true, xs: 12 },
                                React.createElement(Typography, { variant: "body2", color: "textSecondary", component: "p", sx: { color: "white" } }, "Deadline: None")),
                    React.createElement(Grid, { item: true, sx: { justifyContent: "center" } },
                        React.createElement(Link, { to: `/tasks/edit/${taskId}` },
                            React.createElement(Button, { color: "primary", style: { textDecoration: "none" } }, "Edit Task"))),
                    React.createElement(Grid, { item: true, sx: { justifyContent: "center" } },
                        React.createElement(Button, { variant: "contained", color: "error", onClick: handleDeleteTask }, "Delete Task")))))));
}
export default TaskDetailsCard;
