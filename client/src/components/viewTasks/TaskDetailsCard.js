import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../features/auth/AuthContext';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TASK } from '../../features/tasks/taskQueries';
import { DELETE_TASK } from '../../features/tasks/taskMutations';
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
    const { title, description, priority, status, deadline } = data.getTask;
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
    const formatDate = (date) => {
        let formattedDate = new Date(date).toLocaleString('en-us', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
        return formattedDate;
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Card, { style: { maxWidth: 400, border: "2px solid blue", borderRadius: "5%" } },
            React.createElement(CardContent, null,
                React.createElement(Grid, { container: true, spacing: 3 },
                    React.createElement(Grid, { item: true, xs: 12 },
                        React.createElement(Typography, { variant: "h5", component: "h2" }, title)),
                    React.createElement(Grid, { item: true, xs: 12 },
                        React.createElement(Typography, { variant: "body1", component: "p" }, description)),
                    React.createElement(Grid, { item: true, xs: 6 },
                        React.createElement(Typography, { variant: "body2", color: "textSecondary", component: "p" },
                            "Status: ",
                            status)),
                    React.createElement(Grid, { item: true, xs: 6 },
                        React.createElement(Typography, { variant: "body2", color: "textSecondary", component: "p" },
                            "Priority: ",
                            priority)),
                    React.createElement(Grid, { item: true, xs: 12 },
                        React.createElement(Typography, { variant: "body2", color: "textSecondary", component: "p" },
                            "ID: ",
                            taskId)),
                    React.createElement(Grid, { item: true, xs: 12 },
                        React.createElement(Typography, { variant: "body2", color: "textSecondary", component: "p" }, "Created: ")),
                    deadline ?
                        React.createElement(Grid, { item: true, xs: 12 },
                            React.createElement(Typography, { variant: "body2", color: "textSecondary", component: "p" },
                                "Deadline: ",
                                formatDate(deadline)))
                        :
                            React.createElement(Grid, { item: true, xs: 12 },
                                React.createElement(Typography, { variant: "body2", color: "textSecondary", component: "p" }, "Deadline: None")),
                    React.createElement(Grid, { item: true },
                        React.createElement(Button, { variant: "contained", color: "error", onClick: handleDeleteTask }, "Delete Task")))))));
}
export default TaskDetailsCard;
