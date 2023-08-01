import React, { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../features/auth/AuthContext'

interface ProtectedRouteProps {
    children: ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    
    const { token } = useContext(AuthContext)
    
    if(!token) {
        console.log("Protected route, unauthorized")
        return <Navigate to="/login" />
    }
    return <>{token ? children : null}</>
}
