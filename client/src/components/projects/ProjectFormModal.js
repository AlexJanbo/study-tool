import React, { useState, useContext } from 'react';
import { Box, Button, Modal, FormControl, TextField } from '@mui/material';
import { AuthContext } from '../../features/auth/AuthContext';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../../features/projects/projectMutations';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function ProjectFormModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [projectInput, setProjectInput] = useState({ title: '', description: '' });
    const { token } = useContext(AuthContext);
    const [createProject] = useMutation(CREATE_PROJECT, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            },
        },
        onCompleted: () => {
            // refetchProjects()
            handleClose();
        },
        onError: (error) => {
            console.log(error);
        }
    });
    // const { refetch: refetchProjects } = useQuery(GET_PROJECTS_BY_USER, {
    //     context: {
    //       headers: {
    //         authorization: `Bearer ${token}`,
    //       },
    //     },
    //   });
    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setProjectInput((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleCreateProject = (event) => {
        event.preventDefault();
        if (!token) {
            throw new Error("Invalid token");
        }
        // const decoded = jwt.verify(token, APP_SECRET)
        // console.log(APP_SECRET)
        createProject({ variables: { input: projectInput } });
        setProjectInput({
            title: "",
            description: "",
        });
    };
    return (React.createElement("div", null,
        React.createElement(Button, { onClick: handleOpen }, "Create a new Project!"),
        React.createElement(Modal, { open: open, onClose: handleClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" },
            React.createElement(Box, { sx: style },
                React.createElement(FormControl, { variant: "standard" },
                    React.createElement(TextField, { id: "title", label: "Title", variant: "outlined", type: "text", name: "title", value: projectInput.title, onChange: handleChangeInput }),
                    React.createElement(TextField, { id: "description", label: "Description", variant: "outlined", type: "text", name: "description", value: projectInput.description, onChange: handleChangeInput }),
                    React.createElement(Button, { type: "submit", onClick: handleCreateProject }, "Create Project!"))))));
}
