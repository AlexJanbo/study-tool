import { Box, Button, FormControl, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../features/auth/AuthContext';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECT } from '../../features/projects/projectQueries';
import { UPDATE_PROJECT } from '../../features/projects/projectMutations';
export default function EditProjectForm() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    if (!projectId) {
        throw new Error("Task id not found");
    }
    const { token } = useContext(AuthContext);
    const { data, loading, error, } = useQuery(GET_PROJECT, {
        variables: { id: projectId },
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    });
    const [updateProject] = useMutation(UPDATE_PROJECT, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    });
    const [editProjectInput, setEditProjectInput] = useState({
        id: projectId,
        title: data.getProject.title,
        description: data.getProject.description,
    });
    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setEditProjectInput((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleUpdateProject = () => {
        if (!token) {
            throw new Error("Invalid token");
        }
        updateProject({ variables: { input: editProjectInput } });
        navigate(`/projects/${projectId}`);
    };
    if (!editProjectInput.title || !editProjectInput.description) {
        return React.createElement("div", null, "Loading");
    }
    if (loading)
        return React.createElement("div", null, "Loading");
    if (error)
        return React.createElement("div", null, "Error");
    return (React.createElement(Box, null,
        React.createElement(FormControl, { variant: "standard" },
            React.createElement(TextField, { id: "title", label: "Title", variant: "outlined", type: "text", name: "title", value: editProjectInput.title, onChange: handleChangeInput }),
            React.createElement(TextField, { id: "description", label: "Description", variant: "outlined", type: "text", name: "description", value: editProjectInput.description, onChange: handleChangeInput }),
            React.createElement(Button, { type: "submit", onClick: handleUpdateProject }, "Edit Project!"))));
}
