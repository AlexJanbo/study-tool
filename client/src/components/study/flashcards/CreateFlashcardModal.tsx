import React, { useState, useContext, ChangeEvent, FormEvent } from 'react'
import { Box, Button, Modal, FormControl, TextField, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { AuthContext } from '../../../features/auth/AuthContext';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TOPIC } from '../../../features/topics/topicMutations';
import { CREATE_FLASHCARD } from '../../../features/flashcards/flashcardMutation';

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

enum FlashcardTypes {
    Basic = "Basic",
    Cloze = "Cloze",
}

type flashcardType = {
    card_type: FlashcardTypes,
    content: String,
    answer: String,
}


export default function CreateFlashcardModal() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [ flashcardInput, setFlashcardInput ] = useState<flashcardType>({ card_type: FlashcardTypes.Basic, content: "", answer: "" })
    const { token } = useContext(AuthContext)
    
    const [ createFlashcard ] = useMutation(CREATE_FLASHCARD, {
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
    })

    // const { refetch: refetchTasks } = useQuery(GET_TASKS_BY_USER, {
    //     context: {
    //       headers: {
    //         authorization: `Bearer ${token}`,
    //       },
    //     },
    //   });

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFlashcardInput((prevState) => ({ ...prevState, [name]: value}))
    }

    const handleCreateFlashcard = (event: FormEvent) => {
        event.preventDefault()
        if(!token) {
            throw new Error("Invalid token")
        }
        // const decoded = jwt.verify(token, APP_SECRET)
        // console.log(APP_SECRET)
        createFlashcard({ variables: {input: flashcardInput}})
        setFlashcardInput({card_type: FlashcardTypes.Basic, content: "", answer: ""})
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
            New Flashcard!
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <FormControl variant="standard">
                    <FormControl>
                        <FormLabel style={{textAlign:"center", color: "white", marginTop: "2%"}}>Card Type</FormLabel>
                        <RadioGroup
                        row
                        value={flashcardInput.card_type}
                        name="card_type"
                        onChange={handleChangeInput}
                        >
                            <FormControlLabel sx={{ color: "white"}} value={FlashcardTypes.Basic} control={<Radio />} label="Basic" />
                            <FormControlLabel sx={{ color: "white"}} value={FlashcardTypes.Cloze} control={<Radio />} label="Cloze" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        id="content"
                        label="Content"
                        variant="outlined"
                        type="text"
                        name="content"
                        value={flashcardInput.content}
                        onChange={handleChangeInput}
                        // error={usernameError}
                        // helperText={usernameError ? "Please enter a valid username" : null}
                    />
                    <TextField
                        id="answer"
                        label="Answer"
                        variant="outlined"
                        type="text"
                        name="answer"
                        value={flashcardInput.answer}
                        onChange={handleChangeInput}
                        // error={usernameError}
                        // helperText={usernameError ? "Please enter a valid username" : null}
                    />
                
                    <Button type="submit" onClick={handleCreateFlashcard}>
                        Create Flashcard!
                    </Button>
                </FormControl>
            </Box>
        </Modal>
        </div>
    );
}