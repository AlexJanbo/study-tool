import React, { useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
export default function FlashCard() {
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
        React.createElement(Card, null,
            React.createElement(CardContent, null,
                React.createElement(Typography, { variant: "h5", component: "h2" })),
            React.createElement(Button, { variant: "contained", color: "primary", onClick: handleFlip }, isFlipped ? 'Show Question' : 'Show Answer'),
            isFlipped && (React.createElement("div", null,
                React.createElement(Button, { variant: "contained", onClick: () => handleAnswer(true) }, "Correct"),
                React.createElement(Button, { variant: "contained", onClick: () => handleAnswer(false) }, "Incorrect")))),
        isAnswered && (React.createElement(Typography, { variant: "h6", component: "h3" }, "Good Job!"))));
}
;
