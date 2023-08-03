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


type UserInput = {
    title: string,
    description: string,
    priority: PriorityTypes,
    status: StatusTypes
}


function CreateTask() {


    const [ userInput, setUserInput ] = useState<UserInput>({ title: '', description: '', priority: PriorityTypes.Low, status: StatusTypes.Created })
    const [ createTask ] = useMutation(CREATE_TASK)
    const { token } = useContext(AuthContext)


    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setUserInput((prevState) => ({ ...prevState, [name]: value}))
    }


    const handleCreateTask = (event: FormEvent) => {
        event.preventDefault()
        if(!token) {
            throw new Error("Invalid token")
        }
        // const decoded = jwt.verify(token, APP_SECRET)
        // console.log(APP_SECRET)
        createTask({ variables: { title: userInput.title, description: userInput.description, token: token}})
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
                    value={userInput.title}
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
                    value={userInput.description}
                    onChange={handleChangeInput}
                    // error={emailError}
                    // helperText={emailError ? "Please enter a valid email" : null}
                />
                <FormControl>
                  <FormLabel style={{textAlign:"center"}}>Priority</FormLabel>
                  <RadioGroup
                  row
                  value={userInput.priority}
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