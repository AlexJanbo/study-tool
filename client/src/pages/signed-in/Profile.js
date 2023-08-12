import React, { useContext } from 'react';
import { AuthContext } from '../../features/auth/AuthContext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
export function Profile() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { onClick: handleLogout }, "Logout")));
}
