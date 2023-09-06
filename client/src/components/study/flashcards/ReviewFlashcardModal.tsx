import React, { useContext, useState } from 'react';
import { Button, Card, CardContent, Modal, Typography, Box } from '@mui/material';
import { AuthContext } from '../../../features/auth/AuthContext';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: "#373c43",
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type flashcardType = {
  flashcard_id: string,
  card_type: string,
  content: string,
  answer: string,
  last_reviewed: string,
  confidence_level: string,
  created_at: string,
}

type ReviewFlashcardProps = {
  flashcard: flashcardType
}

export default function ReviewFlashcardModal(props: ReviewFlashcardProps) {
    
  const { card_type, content, answer } = props.flashcard
  const { token } = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setIsFlipped(false)
    setIsAnswered(false)
    setOpen(false);
  }
    
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
      <Button onClick={handleOpen} 
          sx={{ 
              margin: 3, 
              color: "white", 
              backgroundColor: "#676767", 
              border: "1px solid black", 
              borderRadius: "10px", 
              '&:hover': { 
                  backgroundColor: "#a9f6ae", 
                  color: "black"} 
          }}>
          Review
      </Button>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {isFlipped ? answer : content}
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
          </Box>
      </Modal>
    </div>
  );
};

