import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { useMutation, useQuery } from '@apollo/client'
import { Skeleton, CircularProgress, Typography } from '@mui/material'
import { GET_TASKS_BY_USER } from './taskQueries'

type taskType = {
    title: string,
    description: string,
    priority: string,
    status: string,
    deadline: string,
}

function GetTasks() {

    const { token } = useContext(AuthContext)
    const { data, loading, error, refetch } = useQuery(GET_TASKS_BY_USER, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })
    
    useEffect(() => {
        refetch()
    }, [])
   
    if(loading) return <div>Loading</div>
    if(error) return <div>error</div>

    console.log(data)

    return (
        <div>
            {data.getTasksByUser.map((task: taskType) => {
                return (
                <Typography>
                    {task.title}
                </Typography>
            )})}
        </div>
    )
}

export default GetTasks