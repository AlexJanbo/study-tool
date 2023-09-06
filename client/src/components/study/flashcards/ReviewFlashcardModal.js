import React, { useContext, useState } from 'react';
import { Button, Card, CardContent, Modal, Typography, Box } from '@mui/material';
import { AuthContext } from '../../../features/auth/AuthContext';
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
export default function ReviewFlashcardModal(props) {
    const { card_type, content, answer } = props.flashcard;
    const { token } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setIsFlipped(false);
        setIsAnswered(false);
        setOpen(false);
    };
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };
    const handleAnswer = (isCorrect) => {
        // Handle the answer
        if (isCorrect) {
            // Play success sound
            // Show success message
        }
        setIsAnswered(true);
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
            } }, "Review"),
        React.createElement(Modal, { open: open, onClose: handleClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" },
            React.createElement(Box, { sx: style },
                React.createElement(Card, null,
                    React.createElement(CardContent, null,
                        React.createElement(Typography, { variant: "h5", component: "h2" }, isFlipped ? answer : content)),
                    React.createElement(Button, { variant: "contained", color: "primary", onClick: handleFlip }, isFlipped ? 'Show Question' : 'Show Answer'),
                    isFlipped && (React.createElement("div", null,
                        React.createElement(Button, { variant: "contained", onClick: () => handleAnswer(true) }, "Correct"),
                        React.createElement(Button, { variant: "contained", onClick: () => handleAnswer(false) }, "Incorrect")))),
                isAnswered && (React.createElement(Typography, { variant: "h6", component: "h3" }, "Good Job!"))))));
}
;
