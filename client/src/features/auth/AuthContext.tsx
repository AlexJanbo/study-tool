import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router'

// Create the auth context type
interface AuthContextType {
    token: string | null
    login: (token: string) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    login: () => {},
    logout: () => {},
})

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ token, setToken ] = useState<string | null>(null)

    useEffect(() => {
        const storedToken = localStorage.getItem('jwt')
        if(storedToken) {
            setToken(storedToken)
        }
    }, [])

    const login = (newToken: string) => {
        setToken(newToken)
        localStorage.setItem('jwt', newToken)
    }

    const logout = () => {
        setToken(null)
        localStorage.removeItem('jwt')
    }

    return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>
}

