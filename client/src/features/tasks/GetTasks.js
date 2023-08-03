import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useQuery } from '@apollo/client';
import { Skeleton } from '@mui/material';
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
    console.log(data);
    console.log(loading);
    useEffect(() => {
        refetch();
    }, []);
    if (typeof data === 'undefined' || loading) {
        return React.createElement(Skeleton, null);
    }
    return (React.createElement("div", null, data[0].title));
}
export default GetTasks;
