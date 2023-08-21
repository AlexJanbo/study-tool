import React, { createContext, useState } from 'react';
export const AuthContext = createContext({
    token: null,
    login: () => { },
    logout: () => { },
});
export const AuthProvider = ({ children }) => {
    const initialToken = localStorage.getItem("jwt");
    const [token, setToken] = useState(initialToken);
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
