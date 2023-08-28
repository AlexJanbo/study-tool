import * as React from 'react';
import CreateTopicModal from '../../components/study/topics/CreateTopicsModal';
import CreateFlashcardModal from '../../components/study/flashcards/CreateFlashcardModal';

export default function Study() {


  return (
    <>
      {/* <Layout /> */}
      <CreateTopicModal />
      <CreateFlashcardModal />
    </>
  );
}