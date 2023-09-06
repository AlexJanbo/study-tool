import React, { useState, useContext } from 'react';
import { Box, Button, Modal, FormControl, TextField } from '@mui/material';
import { AuthContext } from '../../../features/auth/AuthContext';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TOPIC } from '../../../features/topics/topicMutations';
import { GET_TOPICS_BY_USER } from '../../../features/topics/topicQueries';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: "#373c43",
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function CreateTopicModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [topicInput, setTopicInput] = useState({ title: "" });
    const { token } = useContext(AuthContext);
    const [createTopic] = useMutation(CREATE_TOPIC, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            },
        },
        // onCompleted: () => {
        //     refetch()
        //     handleClose()
        // },
        // onError: (error) => {
        //     console.log(error)
        // }
    });
    const { refetch: refetchTopics } = useQuery(GET_TOPICS_BY_USER, {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            },
        },
    });
    const handleCreateTopic = (event) => {
        event.preventDefault();
        if (!token) {
            throw new Error("Invalid token");
        }
        // const decoded = jwt.verify(token, APP_SECRET)
        // console.log(APP_SECRET)
        createTopic({ variables: { input: topicInput } });
        setTopicInput({ title: "" });
        refetchTopics();
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
            } }, "New Topic!"),
        React.createElement(Modal, { open: open, onClose: handleClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" },
            React.createElement(Box, { sx: style },
                React.createElement(FormControl, { variant: "standard" },
                    React.createElement(TextField, { id: "title", label: "Title", variant: "outlined", type: "text", name: "title", value: topicInput.title, onChange: (e) => setTopicInput({ title: e.target.value }) }),
                    React.createElement(Button, { type: "submit", onClick: handleCreateTopic }, "Create Topic!"))))));
}
