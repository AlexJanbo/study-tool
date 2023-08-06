import React, { useState, useContext, ChangeEvent, FormEvent } from 'react'
import { Box, Button, Modal, FormControl, TextField, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
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
  bgcolor: 'background.paper',
  border: '2px solid #000',
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

    }

    return (
        <div>
        <Button onClick={handleOpen}>Create a new Task!</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
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
                        Create Task!
                    </Button>
                </FormControl>
            </Box>
        </Modal>
        </div>
    );
}