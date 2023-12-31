import React, { useState, useContext } from 'react';
import { Box, Button, Modal, FormControl, TextField, FormLabel, RadioGroup, FormControlLabel, Radio, Grid } from '@mui/material';
import { AuthContext } from '../../../features/auth/AuthContext';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_FLASHCARD } from '../../../features/flashcards/flashcardMutation';
import { useParams } from 'react-router';
import { GET_FLASHCARDS_BY_TOPIC } from '../../../features/flashcards/flashcardQueries';
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
var FlashcardTypes;
(function (FlashcardTypes) {
    FlashcardTypes["Basic"] = "Basic";
    FlashcardTypes["Cloze"] = "Cloze";
})(FlashcardTypes || (FlashcardTypes = {}));
export default function CreateFlashcardModal() {
    const { topicId } = useParams();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [flashcardInput, setFlashcardInput] = useState({ card_type: FlashcardTypes.Basic, content: "", answer: "", topic_id: topicId !== null && topicId !== void 0 ? topicId : "" });
    const { token } = useContext(AuthContext);
    const { refetch: refetchFlashcards } = useQuery(GET_FLASHCARDS_BY_TOPIC, {
        variables: { id: topicId },
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            },
        },
    });
    const [createFlashcard] = useMutation(CREATE_FLASHCARD, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            },
        },
        onCompleted: () => {
            refetchFlashcards();
            handleClose();
        },
        // onError: (error) => {
        //     console.log(error)
        // }
    });
    // const { refetch: refetchTasks } = useQuery(GET_TASKS_BY_USER, {
    //     context: {
    //       headers: {
    //         authorization: `Bearer ${token}`,
    //       },
    //     },
    //   });
    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setFlashcardInput((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleCreateFlashcard = (event) => {
        event.preventDefault();
        if (!token) {
            throw new Error("Invalid token");
        }
        // const decoded = jwt.verify(token, APP_SECRET)
        // console.log(APP_SECRET)
        createFlashcard({ variables: { input: flashcardInput } });
        setFlashcardInput({ card_type: FlashcardTypes.Basic, content: "", answer: "", topic_id: topicId !== null && topicId !== void 0 ? topicId : "" });
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
            } }, "New Flashcard!"),
        React.createElement(Modal, { open: open, onClose: handleClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" },
            React.createElement(Box, { sx: style },
                React.createElement(Grid, { sx: { display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" } },
                    React.createElement(FormControl, { variant: "standard" },
                        React.createElement(FormControl, null,
                            React.createElement(FormLabel, { style: { textAlign: "center", color: "white", marginTop: "2%" } }, "Card Type"),
                            React.createElement(RadioGroup, { row: true, value: flashcardInput.card_type, name: "card_type", onChange: handleChangeInput },
                                React.createElement(FormControlLabel, { sx: { color: "white" }, value: FlashcardTypes.Basic, control: React.createElement(Radio, null), label: "Basic" }),
                                React.createElement(FormControlLabel, { sx: { color: "white" }, value: FlashcardTypes.Cloze, control: React.createElement(Radio, null), label: "Cloze" }))),
                        React.createElement(TextField, { id: "content", label: "Content", variant: "outlined", type: "text", name: "content", value: flashcardInput.content, onChange: handleChangeInput, InputLabelProps: { style: { color: "white" } }, InputProps: { inputProps: { style: { color: 'white' } } } }),
                        React.createElement(TextField, { id: "answer", label: "Answer", variant: "outlined", type: "text", name: "answer", value: flashcardInput.answer, onChange: handleChangeInput, sx: { marginTop: "2%" }, InputLabelProps: { style: { color: "white" } }, InputProps: { inputProps: { style: { color: 'white' } } } }),
                        React.createElement(Button, { type: "submit", onClick: handleCreateFlashcard }, "Create Flashcard!")))))));
}
