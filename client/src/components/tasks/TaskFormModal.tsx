import React, { useState, useContext, ChangeEvent, FormEvent } from 'react'
import { Box, Button, Modal, FormControl, TextField, FormLabel, RadioGroup, FormControlLabel, Radio, Grid } from '@mui/material'
import { AuthContext } from '../../features/auth/AuthContext';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TASK } from '../../features/tasks/taskMutations';
import { GET_TASKS_BY_USER } from '../../features/tasks/taskQueries';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '2px solid #000',
  borderRadius: "2%",
  backgroundColor: "#373c43",
  boxShadow: 24,
  p: 4,
};

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

export default function TaskFormModal() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [ taskInput, setTaskInput ] = useState<TaskInput>({ title: '', description: '', priority: PriorityTypes.Low, status: StatusTypes.Created })
    const { token } = useContext(AuthContext)
    
    const [ createTask ] = useMutation(CREATE_TASK, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            },
        },
        onCompleted: () => {
            refetchTasks()
            handleClose()
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const { refetch: refetchTasks } = useQuery(GET_TASKS_BY_USER, {
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });

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
        setTaskInput({
            title: "",
            description: "",
            priority: PriorityTypes.Low,
            status: StatusTypes.Created,
        })

    }

    return (
        <Grid p={0} sx={{ marginTop: "3%", width: "15vw"}}>
            <Button onClick={handleOpen} 
                sx={{ 
                    margin: 3, 
                    color: "white", 
                    backgroundColor: "#676767", 
                    border: "1px solid black", 
                    borderRadius: "10px", 
                    '&:hover': { 
                        backgroundColor: "#a9f6ae", 
                        color: "black"} 
                }}>
                Create a New Task!
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center"}}>
                        <FormControl variant="standard">
                            <TextField
                                id="title"
                                label="Title"
                                variant="outlined"
                                type="text"
                                name="title"
                                value={taskInput.title}
                                onChange={handleChangeInput}
                                InputLabelProps={{ style: { color: "white" }}}
                                InputProps={{ inputProps: { style: { color: 'white' }}}}
                                sx={{ backgroundColor: "#43454a"}}
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
                                InputLabelProps={{ style: { color: "white" }}}
                                InputProps={{ inputProps: { style: { color: 'white' }}}}
                                sx={{ backgroundColor: "#43454a", marginTop: "2%"}}
                                // error={emailError}
                                // helperText={emailError ? "Please enter a valid email" : null}
                            />
                            <FormControl>
                            <FormLabel style={{textAlign:"center", color: "white", marginTop: "2%"}}>Priority</FormLabel>
                            <RadioGroup
                            row
                            value={taskInput.priority}
                            name="priority"
                            onChange={handleChangeInput}
                            >
                                <FormControlLabel sx={{ color: "white"}} value={PriorityTypes.Low} control={<Radio />} label="Low" />
                                <FormControlLabel sx={{ color: "white"}} value={PriorityTypes.Medium} control={<Radio />} label="Medium" />
                                <FormControlLabel sx={{ color: "white"}} value={PriorityTypes.High} control={<Radio />} label="High" />
                            </RadioGroup>
                            </FormControl>
                        
                            <Button type="submit" onClick={handleCreateTask}
                                sx={{ 
                                margin: 3, 
                                color: "white", 
                                backgroundColor: "#676767", 
                                border: "1px solid white", 
                                borderRadius: "10px", 
                                '&:hover': { 
                                    backgroundColor: "#a9f6ae", 
                                    color: "black"} 
                            }}>
                                Create Task!
                            </Button>
                        </FormControl>
                    </Grid>
                </Box>
            </Modal>
        </Grid>
    );
}