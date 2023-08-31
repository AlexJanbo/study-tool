import React, { useState, useContext } from 'react';
import { Box, Button, Modal, FormControl, TextField, FormLabel, RadioGroup, FormControlLabel, Radio, Grid } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_FLASHCARD, UPDATE_FLASHCARD } from '../../../features/flashcards/flashcardMutation';
import { AuthContext } from '../../../features/auth/AuthContext';
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
export default function EditFlashcardModal(props) {
    const { flashcard_id, card_type, content, answer } = props.flashcard;
    const { topicId } = useParams();
    const { token } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [editFlashcardInput, setEditFlashcardInput] = useState({
        flashcard_id: flashcard_id,
        card_type: card_type,
        content: content,
        answer: answer,
    });
    const { refetch: refetchFlashcards } = useQuery(GET_FLASHCARDS_BY_TOPIC, {
        variables: { id: topicId },
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            },
        },
    });
    const [updateFlashcard] = useMutation(UPDATE_FLASHCARD, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    });
    const [deleteFlashcard] = useMutation(DELETE_FLASHCARD, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    });
    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setEditFlashcardInput((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleUpdateFlashcard = () => {
        if (!token) {
            throw new Error("Invalid token");
        }
        updateFlashcard({ variables: { input: editFlashcardInput } });
        refetchFlashcards();
        handleClose();
    };
    const handleDeleteFlashcard = () => {
        deleteFlashcard({ variables: { id: flashcard_id } });
        refetchFlashcards();
        handleClose();
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
            } }, "Edit"),
        React.createElement(Modal, { open: open, onClose: handleClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" },
            React.createElement(Box, { sx: style },
                React.createElement(Grid, { container: true, m: 1, sx: { display: "flex", flexDirection: "column", justifyItems: "space-evenly", alignItems: "center" } },
                    React.createElement(FormControl, null,
                        React.createElement(FormLabel, { style: { textAlign: "center", color: "white", marginTop: "2%" } }, "Card Type"),
                        React.createElement(RadioGroup, { row: true, value: card_type, name: "card_type", onChange: handleChangeInput },
                            React.createElement(FormControlLabel, { sx: { color: "white" }, value: FlashcardTypes.Basic, control: React.createElement(Radio, null), label: "Basic" }),
                            React.createElement(FormControlLabel, { sx: { color: "white" }, value: FlashcardTypes.Cloze, control: React.createElement(Radio, null), label: "Cloze" }))),
                    React.createElement(Grid, { item: true, xs: 12 },
                        React.createElement(TextField, { id: "content", variant: "outlined", label: "Content", type: "text", name: "content", value: editFlashcardInput.content, onChange: handleChangeInput, sx: { color: "white" }, InputLabelProps: { style: { color: "white" } }, InputProps: { inputProps: { style: { color: 'white' } } } })),
                    React.createElement(Grid, { item: true, xs: 12, sx: { marginTop: "2%" } },
                        React.createElement(TextField, { id: "answer", label: "Answer", variant: "outlined", type: "text", name: "answer", value: editFlashcardInput.answer, onChange: handleChangeInput, InputLabelProps: { style: { color: "white" } }, InputProps: { inputProps: { style: { color: 'white' } } } })),
                    React.createElement(Button, { onClick: handleUpdateFlashcard }, "Change"),
                    React.createElement(Button, { variant: "contained", color: "error", onClick: handleDeleteFlashcard }, "Delete flashcard"))))));
}
