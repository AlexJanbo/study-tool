import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../services/auth/authSlice'

export const store = configureStore({
    devTools: true,
    reducer: {
        auth: authReducer,
    }
})