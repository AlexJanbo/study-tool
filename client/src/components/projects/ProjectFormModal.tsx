import React, { useState, useContext, ChangeEvent, FormEvent } from 'react'
import { Box, Button, Modal, FormControl, TextField, FormLabel, RadioGroup, FormControlLabel, Radio, Grid } from '@mui/material'
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
    border: '2px solid #000',
    borderRadius: "2%",
    backgroundColor: "#373c43",
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
        <Grid sx={{ marginLeft: "5%", marginTop: "5%"}}>
            <Button onClick={handleOpen} sx={{ margin: 3, color: "white", backgroundColor: "#676767", border: "1px solid black", borderRadius: "10px", '&:hover': { backgroundColor: "#a9f6ae", color: "black"} }}>Create a New Project!</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center"}}>
                        <FormControl variant="standard">
                            <TextField
                                id="title"
                                label="Title"
                                variant="outlined"
                                type="text"
                                name="title"
                                value={projectInput.title}
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
                                value={projectInput.description}
                                onChange={handleChangeInput}
                                InputLabelProps={{ style: { color: "white" }}}
                                InputProps={{ inputProps: { style: { color: 'white' }}}}
                                sx={{ backgroundColor: "#43454a", marginTop: "2%"}}
                                // error={emailError}
                                // helperText={emailError ? "Please enter a valid email" : null}
                            />
                            <Button type="submit" onClick={handleCreateProject}
                                sx={{ 
                                margin: 3, 
                                color: "white", 
                                backgroundColor: "#676767", 
                                border: "1px solid white", 
                                borderRadius: "10px", 
                                '&:hover': { 
                                    backgroundColor: "#a9f6ae", 
                                    color: "black"
                                }}} 
                            >
                                Create Project!
                            </Button>
                        </FormControl>
                    </Grid>
                </Box>
            </Modal>
        </Grid>
    );
}