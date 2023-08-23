import { Box, Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../features/auth/AuthContext'
import { GET_TASK } from '../../features/tasks/taskQueries'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_TASK, UPDATE_TASK_DEADLINE, UPDATE_TASK_DESCRIPTION, UPDATE_TASK_PRIORITY, UPDATE_TASK_STATUS, UPDATE_TASK_TITLE } from '../../features/tasks/taskMutations'

enum PriorityTypes {
    High = "High",
    Medium = "Medium",
    Low = "Low",
}


enum StatusTypes {
    Created = "Created",
    InProgress = "InProgress",
    Completed = "Completed",
}

type TaskInput = {
    id: string,
    title: string,
    description: string,
    priority: PriorityTypes,
    status: StatusTypes,
    deadline: any,
}

export default function EditTaskForm() {

    const { taskId } = useParams()
    const navigate = useNavigate()
    
    if(!taskId) {
        throw new Error("Task id not found")
    }

    const { token } = useContext(AuthContext)
    const { data, loading, error, } = useQuery(GET_TASK, {
        variables: { id: taskId},
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })

    const [ updateTask ] = useMutation(UPDATE_TASK, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })

    const [ updateTaskTitle ] = useMutation(UPDATE_TASK_TITLE, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })

    const [ updateTaskDescription ] = useMutation(UPDATE_TASK_DESCRIPTION, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })

    const [ updateTaskPriority ] = useMutation(UPDATE_TASK_PRIORITY, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })

    const [ updateTaskStatus ] = useMutation(UPDATE_TASK_STATUS, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })

    const [ updateTaskDeadline ] = useMutation(UPDATE_TASK_DEADLINE, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })

    const [ editTaskInput, setEditTaskInput ] = useState<TaskInput>({ 
        id: taskId, 
        title: data.getTask.title, 
        description: data.getTask.description, 
        priority: data.getTask.priority, 
        status: data.getTask.status, 
        deadline: data.getTask.deadline
    })

    
    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setEditTaskInput((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleUpdateTask = () => {
        if(!token) {
            throw new Error("Invalid token")
        }
        updateTask({ variables: {id: taskId, input: editTaskInput}})
        navigate(`/tasks/${taskId}`)
    }

    const handleUpdateTaskTitle = () => {
        if(!token) {
            throw new Error("Invalid token")
        }
        updateTaskTitle({ variables: {input: {id: taskId, title: editTaskInput.title}}})
    }

    const handleUpdateTaskDescription = () => {
        if(!token) {
            throw new Error("Invalid token")
        }
        updateTaskDescription({ variables: {input: {id: taskId, description: editTaskInput.description}}})
    }

    const handleUpdateTaskPriority = () => {
        if(!token) {
            throw new Error("Invalid token")
        }
        updateTaskPriority({ variables: {input: {id: taskId, priority: editTaskInput.priority}}})
    }

    const handleUpdateTaskStatus = () => {
        if(!token) {
            throw new Error("Invalid token")
        }
        updateTaskStatus({ variables: {input: {id: taskId, status: editTaskInput.status}}})
    }

    const handleUpdateTaskDeadline = () => {
        if(!token) {
            throw new Error("Invalid token")
        }
        updateTaskDeadline({ variables: {input: {id: taskId, deadline: editTaskInput.deadline}}})
    }

    if(!editTaskInput.title || !editTaskInput.description || !editTaskInput.priority || !editTaskInput.status) {
        return <div>Loading</div>
    }
    if(loading) return <div>Loading</div>
    if(error) return <div>Error</div>


    return (
        <Card style={{ maxWidth: 400, border: "1px solid white", borderRadius: "2%", marginLeft: "5%", backgroundColor: "#43454a"}}>
            <CardContent >
                <Grid container m={1} sx={{ display: "flex", flexDirection: "column", justifyItems: "space-evenly", alignItems: "center"}} >
                    <Grid item xs={12}>
                        <TextField
                            id="title"
                            variant="outlined"
                            label="Title"
                            type="text"
                            name="title"
                            value={editTaskInput.title}
                            onChange={handleChangeInput}
                            sx={{ color: "white" }}
                            InputLabelProps={{ style: { color: "white" }}}
                            InputProps={{ inputProps: { style: { color: 'white' }}}}
                            // error={usernameError}
                            // helperText={usernameError ? "Please enter a valid username" : null}
                        />
                        <Button onClick={handleUpdateTaskTitle}>Set Title</Button>
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: "2%"}}>
                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            type="text"
                            name="description"
                            value={editTaskInput.description}
                            onChange={handleChangeInput}
                            InputLabelProps={{ style: { color: "white" }}}
                            InputProps={{ inputProps: { style: { color: 'white' }}}}
                            // error={emailError}
                            // helperText={emailError ? "Please enter a valid email" : null}
                        />
                        <Button onClick={handleUpdateTaskDescription}>Set Description</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                        <FormLabel style={{textAlign:"center", color: "white"}}>Priority</FormLabel>
                            <RadioGroup
                            row
                            value={editTaskInput.priority}
                            name="priority"
                            onChange={handleChangeInput}
                            >
                                <FormControlLabel sx={{ color: "white"}} value={PriorityTypes.Low} control={<Radio />} label="Low" />
                                <FormControlLabel sx={{ color: "white"}} value={PriorityTypes.Medium} control={<Radio />} label="Medium" />
                                <FormControlLabel sx={{ color: "white"}} value={PriorityTypes.High} control={<Radio />} label="High" />
                            </RadioGroup>
                            <Button onClick={handleUpdateTaskPriority}>Set Priority</Button>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                        <FormLabel style={{textAlign:"center", color: "white"}}>Status</FormLabel>
                            <RadioGroup
                            row
                            value={editTaskInput.status}
                            name="status"
                            onChange={handleChangeInput}
                            >
                                <FormControlLabel sx={{ color: "white"}} value={StatusTypes.Completed} control={<Radio />} label="Completed" />
                                <FormControlLabel sx={{ color: "white"}} value={StatusTypes.InProgress} control={<Radio />} label="In Progress" />
                                <FormControlLabel sx={{ color: "white"}} value={StatusTypes.Created} control={<Radio />} label="Created" />
                            </RadioGroup>
                            <Button onClick={handleUpdateTaskStatus}>Set Status</Button>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                            <input 
                            type="datetime-local" 
                            id="deadline"
                            name="deadline"
                            value={editTaskInput.deadline}
                            onChange={handleChangeInput}
                            />
                        </FormControl>
                        <Button onClick={handleUpdateTaskDeadline}>Set Deadline</Button>
                    </Grid>
                    {/* <Button type="submit" onClick={handleUpdateTask}>
                        Edit Task!
                    </Button> */}
                </Grid>
            </CardContent>
        </Card>
    )
}

