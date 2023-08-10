import { Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../features/auth/AuthContext'
import { useMutation, useQuery } from '@apollo/client'
import { GET_TASK } from '../../features/tasks/taskQueries'
import { DELETE_TASK } from '../../features/tasks/taskMutations'
import { formatDate } from '../../utils'


function TaskDetailsCard() {

    const { taskId } = useParams()
    const navigate = useNavigate()
    console.log(taskId)

    const { token } = useContext(AuthContext)
    const { data, loading, error, } = useQuery(GET_TASK, {
        variables: { id: taskId},
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })

    const [ deleteTask ] = useMutation(DELETE_TASK, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })
    
    if(loading) return <div>Loading</div>
    if(error) return <div>error</div>

    let title, description, priority, status, deadline, created_at
    if(data.getTask) {(
        { title, description, priority, status, deadline, created_at } = data.getTask
    )}

    console.log(created_at)

    const handleDeleteTask = () => {
        deleteTask({ variables: { id: taskId}})
            .then((result) => {
                console.log(result.data.deleteTask.message)
                navigate('/tasks')
            })
            .catch((error) => {
                console.log("Failed to delete task")
            })
    }



    return (
        <>
            <Card style={{ maxWidth: 400, border: "2px solid blue", borderRadius: "5%"}}>
                <CardContent >
                <Grid container spacing={3} >
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h2">
                        {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" component="p">
                        {description}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary" component="p">
                        Status: {status}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary" component="p">
                        Priority: {priority}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary" component="p">
                        ID: {taskId}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Created: {formatDate(new Date(created_at))}
                        </Typography>
                    </Grid>
                    {
                        deadline ?
                        <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Deadline: {formatDate(deadline)}
                            </Typography>
                        </Grid>
                        :
                        <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Deadline: None
                            </Typography>
                        </Grid>

                    }
                    <Grid item>
                        <Link to={`/tasks/edit/${taskId}`}>
                            <Button color="primary" style={{ textDecoration: "none"}}>
                                Edit Task
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="error" onClick={handleDeleteTask} >
                            Delete Task
                        </Button> 
                    </Grid>
                </Grid>
                </CardContent>
            </Card>
        </>
  )
}

export default TaskDetailsCard