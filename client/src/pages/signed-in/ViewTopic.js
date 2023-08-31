import * as React from 'react';
import { Stack } from '@mui/material';
import CreateFlashcardModal from '../../components/study/flashcards/CreateFlashcardModal';
import FlashcardTable from '../../components/study/flashcards/FlashcardTable';
export default function ViewTopic() {
    return (React.createElement(React.Fragment, null,
        React.createElement(Stack, { direction: "column", spacing: 2 },
            React.createElement(CreateFlashcardModal, null),
            React.createElement(FlashcardTable, null))));
}
