import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../features/auth/AuthContext'
import { GET_TASK } from '../../features/tasks/taskQueries'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_TASK } from '../../features/tasks/taskMutations'

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

    if(!editTaskInput.title || !editTaskInput.description || !editTaskInput.priority || !editTaskInput.status) {
        return <div>Loading</div>
    }
    if(loading) return <div>Loading</div>
    if(error) return <div>Error</div>


    return (
        <Box>
            <FormControl variant="standard">
                <TextField
                    id="title"
                    label="Title"
                    variant="outlined"
                    type="text"
                    name="title"
                    value={editTaskInput.title}
                    onChange={handleChangeInput}
                    // error={usernameError}
                    // helperText={usernameError ? "Please enter a valid username" : null}
                />
                <TextField
                    id="description"
                    label="Description"
                    variant="outlined"
                    type="text"
                    name="description"
                    value={editTaskInput.description}
                    onChange={handleChangeInput}
                    // error={emailError}
                    // helperText={emailError ? "Please enter a valid email" : null}
                />
                <FormControl>
                <FormLabel style={{textAlign:"center"}}>Priority</FormLabel>
                    <RadioGroup
                    row
                    value={editTaskInput.priority}
                    name="priority"
                    onChange={handleChangeInput}
                    >
                        <FormControlLabel value={PriorityTypes.Low} control={<Radio />} label="Low" />
                        <FormControlLabel value={PriorityTypes.Medium} control={<Radio />} label="Medium" />
                        <FormControlLabel value={PriorityTypes.High} control={<Radio />} label="High" />
                    </RadioGroup>
                </FormControl>
                <FormControl>
                <FormLabel style={{textAlign:"center"}}>Status</FormLabel>
                    <RadioGroup
                    row
                    value={editTaskInput.status}
                    name="status"
                    onChange={handleChangeInput}
                    >
                        <FormControlLabel value={StatusTypes.Completed} control={<Radio />} label="Completed" />
                        <FormControlLabel value={StatusTypes.InProgress} control={<Radio />} label="In Progress" />
                        <FormControlLabel value={StatusTypes.Created} control={<Radio />} label="Created" />
                    </RadioGroup>
                </FormControl>

                <FormControl>
                    <input 
                    type="datetime-local" 
                    id="deadline"
                    name="deadline"
                    value={editTaskInput.deadline}
                    onChange={handleChangeInput}
                    />
                </FormControl>
                <Button type="submit" onClick={handleUpdateTask}>
                    Edit Task!
                </Button>
            </FormControl>
        </Box>
    )
}

