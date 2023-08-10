import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Grid, TextField, FormControl } from '@mui/material';
import SearchUsersCard from '../SearchUsersCard';
import { AuthContext } from '../../features/auth/AuthContext';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECTS_BY_USER } from '../../features/projects/projectQueries';
import { CREATE_GROUP_PROJECT } from '../../features/projects/projectMutations';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    borderRadius: "10%",
    bgcolor: '#676767',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function GroupProjectFormModal() {
    const [open, setOpen] = useState(false);
    const [queryUsers, setQueryUsers] = useState('');
    const { token } = useContext(AuthContext);
    const [groupProjectInput, setGroupProjectInput] = useState({ title: '', description: '', members: [] });
    const [createGroupProject] = useMutation(CREATE_GROUP_PROJECT, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            },
        },
        onCompleted: () => {
            refetchProjects();
            handleClose();
        },
        onError: (error) => {
            console.log(error);
        }
    });
    const { refetch: refetchProjects } = useQuery(GET_PROJECTS_BY_USER, {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            },
        },
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setGroupProjectInput({
            title: '',
            description: '',
            members: [],
        });
        setQueryUsers('');
    };
    const handleAddMember = (member) => {
        if (groupProjectInput.members.includes(member)) {
            console.log("Member already selected");
            return;
        }
        if (groupProjectInput.members.length >= 8) {
            console.log("maximum number of chat members exceeded");
            return;
        }
        setGroupProjectInput((prevState) => (Object.assign(Object.assign({}, prevState), { members: [...prevState.members, member] })));
    };
    const handleRemoveMember = (member) => {
        const newProjectMembers = groupProjectInput.members.filter((user) => user !== member);
        setGroupProjectInput((prevState) => (Object.assign(Object.assign({}, prevState), { members: [...newProjectMembers] })));
    };
    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setGroupProjectInput((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleCreateGroupProject = () => {
        createGroupProject({ variables: { input: groupProjectInput } });
        setGroupProjectInput({
            title: "",
            description: "",
            members: [],
        });
        handleClose();
    };
    const membersExist = (members) => {
        if (members.length > 0) {
            return true;
        }
        return false;
    };
    return (React.createElement("div", null,
        React.createElement(Button, { onClick: handleOpen, sx: { margin: 3, color: "white", backgroundColor: "#676767", border: "1px solid black", borderRadius: "10px", '&:hover': { backgroundColor: "#a9f6ae", color: "black" } } }, "Create a Project!"),
        React.createElement(Modal, { open: open, onClose: handleClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" },
            React.createElement(Box, { sx: style },
                React.createElement(Grid, { sx: { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" } },
                    React.createElement(Grid, { sx: { textAlign: "center", width: "100%", borderBottom: "1px solid black" } },
                        React.createElement(Typography, { id: "modal-modal-title", variant: "h4", sx: { color: "white" } }, "Create Project")),
                    React.createElement(FormControl, { variant: "standard" },
                        React.createElement(TextField, { id: "title", label: "Title", variant: "outlined", type: "text", name: "title", value: groupProjectInput.title, onChange: handleChangeInput }),
                        React.createElement(TextField, { id: "description", label: "Description", variant: "outlined", type: "text", name: "description", value: groupProjectInput.description, onChange: handleChangeInput })),
                    React.createElement(SearchUsersCard, { handleAddMember: handleAddMember }),
                    membersExist(groupProjectInput.members) && React.createElement(Typography, { variant: "h6", sx: { color: "white", borderBottom: "1px solid black" } }, "Members"),
                    React.createElement(Grid, { sx: { display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap" } }, groupProjectInput.members && groupProjectInput.members.map((member) => {
                        return (React.createElement(Grid, { onClick: () => handleRemoveMember(member), sx: { border: "0.5px solid black", borderRadius: "5%", padding: 1, margin: 1, backgroundColor: "#b5e2ff", '&:hover': { backgroundColor: "red" } } },
                            React.createElement(Typography, null, member)));
                    })),
                    React.createElement(Divider, null),
                    React.createElement(Grid, { sx: { display: "flex", justifyContent: "center", width: "100%", borderTop: "1px solid black" } },
                        React.createElement(Button, { sx: { color: "black", backgroundColor: "#a9f6ae", border: "1px solid black", borderRadius: "10px", marginTop: "5%", '&:hover': { backgroundColor: "#86c48a" } }, onClick: handleCreateGroupProject }, "Create Project")))))));
}
