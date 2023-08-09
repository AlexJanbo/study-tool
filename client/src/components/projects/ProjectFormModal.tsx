import React, { useState, useContext, ChangeEvent, FormEvent } from 'react'
import { Box, Button, Modal, FormControl, TextField, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { AuthContext } from '../../features/auth/AuthContext';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PROJECT } from '../../features/projects/projectMutations';
import { GET_PROJECTS_BY_USER } from '../../features/projects/projectQueries';

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



type ProjectInput = {
    title: string,
    description: string,
}

export default function ProjectFormModal() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [ projectInput, setProjectInput ] = useState<ProjectInput>({ title: '', description: '' })
    const { token } = useContext(AuthContext)
    
    const [ createProject ] = useMutation(CREATE_PROJECT, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            },
        },
        onCompleted: () => {
            refetchProjects()
            handleClose()
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const { refetch: refetchProjects } = useQuery(GET_PROJECTS_BY_USER, {
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setProjectInput((prevState) => ({ ...prevState, [name]: value}))
    }


    const handleCreateProject = (event: FormEvent) => {
        event.preventDefault()
        if(!token) {
            throw new Error("Invalid token")
        }
        // const decoded = jwt.verify(token, APP_SECRET)
        // console.log(APP_SECRET)
        createProject({ variables: {input: projectInput}})
        setProjectInput({
            title: "",
            description: "",
        })

    }

    return (
        <div>
        <Button onClick={handleOpen}>Create a new Project!</Button>
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
                        value={projectInput.title}
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
                        value={projectInput.description}
                        onChange={handleChangeInput}
                        // error={emailError}
                        // helperText={emailError ? "Please enter a valid email" : null}
                    />
                    <Button type="submit" onClick={handleCreateProject}>
                        Create Project!
                    </Button>
                </FormControl>
            </Box>
        </Modal>
        </div>
    );
}