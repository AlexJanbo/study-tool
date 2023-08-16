import { Box, Button, Modal } from '@mui/material';
import React, { useState } from 'react';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const CommentImageModal = ({ image }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { onClick: handleOpen }, "Image"),
        React.createElement(Modal, { open: open, onClose: handleClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" },
            React.createElement(Box, { sx: style },
                React.createElement("img", { src: image, alt: "" })))));
};
export default CommentImageModal;
