import * as React from 'react';
import CreateTopicModal from '../../components/study/topics/CreateTopicsModal';
import CreateFlashcardModal from '../../components/study/flashcards/CreateFlashcardModal';
export default function Study() {
    return (React.createElement(React.Fragment, null,
        React.createElement(CreateTopicModal, null),
        React.createElement(CreateFlashcardModal, null)));
}
