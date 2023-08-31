import React, { useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';


export default function FlashCard() {
    
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (isCorrect: boolean) => {
    // Handle the answer
    if (isCorrect) {
      // Play success sound
      // Show success message
    }
    setIsAnswered(true);
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {/* {isFlipped ? answer : question} */}
          </Typography>
        </CardContent>
        <Button variant="contained" color="primary" onClick={handleFlip}>
          {isFlipped ? 'Show Question' : 'Show Answer'}
        </Button>
        {isFlipped && (
          <div>
            <Button variant="contained" onClick={() => handleAnswer(true)}>
              Correct
            </Button>
            <Button variant="contained" onClick={() => handleAnswer(false)}>
              Incorrect
            </Button>
          </div>
        )}
      </Card>
      {isAnswered && (
        <Typography variant="h6" component="h3">
          Good Job!
        </Typography>
      )}
    </div>
  );
};

