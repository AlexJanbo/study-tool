import { Avatar } from '@mui/material';
import React from 'react';
import defaultAvatar from '../images/default-avatar.png';
export default function AvatarCircle({ image }) {
    return (React.createElement(Avatar, { component: "span", src: image || defaultAvatar, sx: { height: 24, width: 24 } }));
}
