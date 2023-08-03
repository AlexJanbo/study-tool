import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../features/auth/AuthContext';
import { useQuery } from '@apollo/client';
import { GET_TASK } from '../../features/tasks/taskQueries';
function TaskDetailsCard() {
    const { taskId } = useParams();
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
    if (loading)
        return React.createElement("div", null, "Loading");
    if (error)
        return React.createElement("div", null, "error");
    const { title, description, priority, status, deadline } = data.getTask;
    // const handleDeleteClick = () => {
    //     dispatch(deleteTask(id))
    //     navigate('/tasks')
    // }
    // const formatDate = (date) => {
    //     let formattedDate = new Date(date).toLocaleString('en-us', {
    //         year: 'numeric',
    //         month: 'short',
    //         day: 'numeric',
    //         hour: 'numeric',
    //         minute: 'numeric',
    //         hour12: true,
    //     })
    //     return formattedDate
    // }
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
                    React.createElement(Grid, { item: true },
                        React.createElement(Button, { variant: "contained", color: "error" }, "Delete Task")))))));
}
export default TaskDetailsCard;
