import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService'

type UserData = {
    id: number,
    name: string,
    email: string,
    // Add more props as needed
}

// Get the user from local storage (returns string | null)
const userFromLocalStorage: string | null = localStorage.getItem('user');

// Parse user if exists or leave null
const parsedUser : UserData | null = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    users: [],
    profile: null,
};

type ErrorMessage = string;

export const registerUser = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.RegisterUser(user)
    } catch (error: unknown) {
        const message = 
        (error instanceof Error && error?.message || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

export const LoginUser = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.LoginUser(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const LogoutUser = createAsyncThunk('auth/logout', async () =>
    await authService.LogoutUser()
)