import { Avatar } from '@mui/material';
import React from 'react';
export default function AvatarCircle({ image }) {
    return (React.createElement(Avatar, { component: "span", 
        // src={image || defaultAvatar} // Use image if available, else use defaultAvatar
        sx: { height: 24, width: 24 } }));
}
