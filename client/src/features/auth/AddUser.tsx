import { useMutation } from '@apollo/client'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { ADD_USER } from './userMutations'
import { Box, Button, FormControl, TextField } from '@mui/material'

type UserInput = {
    name: string,
    email: string,
    password: string,
}

export const AddUser = () => {

    const [ userInput, setUserInput ] = useState<UserInput>({ name: '', email: '', password: ''})
    const [ addUser ] = useMutation(ADD_USER)

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setUserInput((prevState) => ({ ...prevState, [name]: value}))
    }

    const handleRegistration = (event: FormEvent) => {
        event.preventDefault()
        addUser({ variables: userInput})
    }

    return (
        <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <FormControl variant="standard">
                <TextField id="name" label="Name" variant="outlined" type="text" name="name" value={userInput.name} onChange={handleChangeInput} />
                <TextField id="email" label="Email" variant="outlined" type="text" name="email" value={userInput.email} onChange={handleChangeInput} />
                <TextField id="password" label="Password" variant="outlined" type="password" name="password" value={userInput.password} onChange={handleChangeInput} />

                <Button type="submit" onClick={handleRegistration}>
                    Sign Up!
                </Button>
            </FormControl>
        </Box>
    )
}