import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext({
    token: null,
    login: () => { },
    logout: () => { },
});
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    useEffect(() => {
        const storedToken = localStorage.getItem('jwt');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);
    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('jwt', newToken);
    };
    const logout = () => {
        setToken(null);
        localStorage.removeItem('jwt');
    };
    return React.createElement(AuthContext.Provider, { value: { token, login, logout } }, children);
};
