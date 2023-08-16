import React, { useState, useContext } from 'react';
import { Box, Button, Modal, FormControl, TextField } from '@mui/material';
import { AuthContext } from '../../features/auth/AuthContext';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { CREATE_COMMENT } from '../../features/comments/commentMutations';
import { GET_COMMENTS_BY_TASK } from '../../features/comments/commentQueries';
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
export default function CreateCommentModal() {
    const { taskId } = useParams();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    if (!taskId) {
        throw new Error("Invalid taskId");
    }
    const [commentInput, setCommentInput] = useState({ task_id: taskId, description: '', image: '' });
    const { token } = useContext(AuthContext);
    const [createComment] = useMutation(CREATE_COMMENT, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            },
        },
        onCompleted: () => {
            refetchComments();
            handleClose();
        },
        onError: (error) => {
            console.log(error);
        }
    });
    const { refetch: refetchComments } = useQuery(GET_COMMENTS_BY_TASK, {
        variables: { id: taskId },
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            },
        },
    });
    const handleImage = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file)
            return;
        const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/pdf'];
        if (allowedFileTypes.includes(file.type) && file.size < 5000000) {
            setFileToBase(file);
        }
        else {
            throw new Error("Invalid file type. Only jpeg, jpg, png, pdf allowed.");
        }
    };
    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setCommentInput(prevState => (Object.assign(Object.assign({}, prevState), { image: reader.result })));
            }
        };
    };
    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setCommentInput((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleCreateComment = (event) => {
        event.preventDefault();
        if (!token) {
            throw new Error("Invalid token");
        }
        // const decoded = jwt.verify(token, APP_SECRET)
        // console.log(APP_SECRET)
        createComment({ variables: { input: commentInput } });
        setCommentInput({
            task_id: taskId,
            description: "",
            image: "",
        });
    };
    return (React.createElement("div", null,
        React.createElement(Button, { onClick: handleOpen, sx: {
                margin: 3,
                color: "white",
                backgroundColor: "#676767",
                border: "1px solid black",
                borderRadius: "10px",
                '&:hover': {
                    backgroundColor: "#a9f6ae",
                    color: "black"
                }
            } }, "New Comment!"),
        React.createElement(Modal, { open: open, onClose: handleClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" },
            React.createElement(Box, { sx: style },
                React.createElement(FormControl, { variant: "standard" },
                    React.createElement(TextField, { id: "description", label: "Description", variant: "outlined", type: "text", name: "description", value: commentInput.description, onChange: handleChangeInput }),
                    React.createElement("label", null, "Attach an image"),
                    React.createElement("input", { onChange: handleImage, type: "file", id: "ImageUpload", name: "image" }),
                    React.createElement(Button, { type: "submit", onClick: handleCreateComment }, "Create Comment!"))))));
}
