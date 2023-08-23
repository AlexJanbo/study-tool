import { Avatar } from '@mui/material';
import React from 'react';
import defaultAvatar from '../images/default-avatar.png';

interface AvatarCircleProps {
    image: string;
}

export default function AvatarCircle({ image }: AvatarCircleProps) {
    return (
        <Avatar
            component="span"
            src={image || defaultAvatar} // Use image if available, else use defaultAvatar
            sx={{ height: 24, width: 24 }}
        />
    );
}