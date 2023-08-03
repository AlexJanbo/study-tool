import React, { ChangeEvent, useState, FormEvent, useContext } from 'react'
import { Box, FormControl, TextField, Button, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
// import jwt from 'jsonwebtoken'
import { useMutation } from '@apollo/client'
import { CREATE_TASK } from './taskMutations'
import { AuthContext } from '../auth/AuthContext'
// import { APP_SECRET } from '../../utils/index'
// import dotEnv from 'dotenv'
// dotEnv.config()
// const APP_SECRET: string = process.env.APP_SECRET || ''




enum PriorityTypes {
    High = "High",
    Medium = "Medium",
    Low = "Low",
}


enum StatusTypes {
    Created = "Created",
    InProgress = "In-progress",
    Completed = "Completed",
}


type TaskInput = {
    title: string,
    description: string,
    priority: PriorityTypes,
    status: StatusTypes
}


function CreateTask() {


    const [ taskInput, setTaskInput ] = useState<TaskInput>({ title: '', description: '', priority: PriorityTypes.Low, status: StatusTypes.Created })
    const { token } = useContext(AuthContext)
    
    const [ createTask ] = useMutation(CREATE_TASK, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })


    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setTaskInput((prevState) => ({ ...prevState, [name]: value}))
    }


    const handleCreateTask = (event: FormEvent) => {
        event.preventDefault()
        if(!token) {
            throw new Error("Invalid token")
        }
        // const decoded = jwt.verify(token, APP_SECRET)
        // console.log(APP_SECRET)
        createTask({ variables: {input: taskInput}})
    }




    return (
        <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <FormControl variant="standard">
                <TextField
                    id="title"
                    label="Title"
                    variant="outlined"
                    type="text"
                    name="title"
                    value={taskInput.title}
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
                    value={taskInput.description}
                    onChange={handleChangeInput}
                    // error={emailError}
                    // helperText={emailError ? "Please enter a valid email" : null}
                />
                <FormControl>
                  <FormLabel style={{textAlign:"center"}}>Priority</FormLabel>
                  <RadioGroup
                  row
                  value={taskInput.priority}
                  name="priority"
                  onChange={handleChangeInput}
                  >
                    <FormControlLabel value={PriorityTypes.Low} control={<Radio />} label="Low" />
                    <FormControlLabel value={PriorityTypes.Medium} control={<Radio />} label="Medium" />
                    <FormControlLabel value={PriorityTypes.High} control={<Radio />} label="High" />
                  </RadioGroup>
                </FormControl>
               
                <Button type="submit" onClick={handleCreateTask}>
                    Sign Up!
                </Button>
            </FormControl>
        </Box>
    )
}


export default CreateTask