import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../features/auth/AuthContext'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PROJECT } from '../../features/projects/projectQueries'
import { UPDATE_PROJECT } from '../../features/projects/projectMutations'


type ProjectInput = {
    id: string,
    title: string,
    description: string,
}

export default function EditProjectForm() {

    const { projectId } = useParams()
    const navigate = useNavigate()
    
    if(!projectId) {
        throw new Error("Task id not found")
    }

    const { token } = useContext(AuthContext)
    const { data, loading, error, } = useQuery(GET_PROJECT, {
        variables: { id: projectId},
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })

    const [ updateProject ] = useMutation(UPDATE_PROJECT, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })

    const [ editProjectInput, setEditProjectInput ] = useState<ProjectInput>({ 
        id: projectId, 
        title: data.getProject.title, 
        description: data.getProject.description, 
    })

    
    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setEditProjectInput((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleUpdateProject = () => {
        if(!token) {
            throw new Error("Invalid token")
        }
        updateProject({ variables: {input: editProjectInput}})
        navigate(`/projects/${projectId}`)
    }

    if(!editProjectInput.title || !editProjectInput.description) {
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
                    value={editProjectInput.title}
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
                    value={editProjectInput.description}
                    onChange={handleChangeInput}
                    // error={emailError}
                    // helperText={emailError ? "Please enter a valid email" : null}
                />
                <Button type="submit" onClick={handleUpdateProject}>
                    Edit Project!
                </Button>
            </FormControl>
        </Box>
    )
}