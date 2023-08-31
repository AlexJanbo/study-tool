import React, { useState, useContext, ChangeEvent, FormEvent } from 'react'
import { Box, Button, Modal, FormControl, TextField, FormLabel, RadioGroup, FormControlLabel, Radio, Grid } from '@mui/material'
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_FLASHCARD, UPDATE_FLASHCARD } from '../../../features/flashcards/flashcardMutation';
import { AuthContext } from '../../../features/auth/AuthContext';
import { useParams } from 'react-router';
import { GET_FLASHCARDS_BY_TOPIC } from '../../../features/flashcards/flashcardQueries';
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

type EditFlashCardModalProps = {
    flashcard: flashcardType
}

enum FlashcardTypes {
    Basic = "Basic",
    Cloze = "Cloze",
}

type FlashcardInput = {
    flashcard_id: string,
    card_type: string,
    content: string,
    answer: string,
}


export default function EditFlashcardModal(props: EditFlashCardModalProps) {

    const { flashcard_id, card_type, content, answer } = props.flashcard
    const { topicId } = useParams()

    const { token } = useContext(AuthContext)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [ editFlashcardInput, setEditFlashcardInput ] = useState<FlashcardInput>({ 
        flashcard_id: flashcard_id,
        card_type: card_type,
        content: content,
        answer: answer,
    })
    
    const { refetch: refetchFlashcards } = useQuery(GET_FLASHCARDS_BY_TOPIC, {
        variables: {id: topicId},
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
    });

    const [ updateFlashcard ] = useMutation(UPDATE_FLASHCARD, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })

    const [ deleteFlashcard ] = useMutation(DELETE_FLASHCARD, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setEditFlashcardInput((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleUpdateFlashcard = () => {
        if(!token) {
            throw new Error("Invalid token")
        }
        updateFlashcard({ variables: {input: editFlashcardInput}})
        refetchFlashcards()
        handleClose()
    }

    const handleDeleteFlashcard = () => {
        deleteFlashcard({ variables: { id: flashcard_id}})
        refetchFlashcards()
        handleClose()
    }


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
            Edit
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container m={1} sx={{ display: "flex", flexDirection: "column", justifyItems: "space-evenly", alignItems: "center"}} >
                    <FormControl>
                        <FormLabel style={{textAlign:"center", color: "white", marginTop: "2%"}}>Card Type</FormLabel>
                        <RadioGroup
                        row
                        value={card_type}
                        name="card_type"
                        onChange={handleChangeInput}
                        >
                            <FormControlLabel sx={{ color: "white"}} value={FlashcardTypes.Basic} control={<Radio />} label="Basic" />
                            <FormControlLabel sx={{ color: "white"}} value={FlashcardTypes.Cloze} control={<Radio />} label="Cloze" />
                        </RadioGroup>
                    </FormControl>
                    <Grid item xs={12}>
                        <TextField
                            id="content"
                            variant="outlined"
                            label="Content"
                            type="text"
                            name="content"
                            value={editFlashcardInput.content}
                            onChange={handleChangeInput}
                            sx={{ color: "white" }}
                            InputLabelProps={{ style: { color: "white" }}}
                            InputProps={{ inputProps: { style: { color: 'white' }}}}
                            // error={usernameError}
                            // helperText={usernameError ? "Please enter a valid username" : null}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: "2%"}}>
                        <TextField
                            id="answer"
                            label="Answer"
                            variant="outlined"
                            type="text"
                            name="answer"
                            value={editFlashcardInput.answer}
                            onChange={handleChangeInput}
                            InputLabelProps={{ style: { color: "white" }}}
                            InputProps={{ inputProps: { style: { color: 'white' }}}}
                            // error={emailError}
                            // helperText={emailError ? "Please enter a valid email" : null}
                        />
                    </Grid>
                    <Button onClick={handleUpdateFlashcard}>Change</Button>
                    <Button variant="contained" color="error" onClick={handleDeleteFlashcard}>Delete flashcard</Button>
                </Grid>
            </Box>
        </Modal>
        </div>
    );
}