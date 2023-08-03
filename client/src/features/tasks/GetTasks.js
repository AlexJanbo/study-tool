import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import { GET_TASKS_BY_USER } from './taskQueries';
function GetTasks() {
    const { token } = useContext(AuthContext);
    const { data, loading, error, refetch } = useQuery(GET_TASKS_BY_USER, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    });
    useEffect(() => {
        refetch();
    }, []);
    if (loading)
        return React.createElement("div", null, "Loading");
    if (error)
        return React.createElement("div", null, "error");
    console.log(data);
    return (React.createElement("div", null, data.getTasksByUser.map((task) => {
        return (React.createElement(Typography, null, task.title));
    })));
}
export default GetTasks;
