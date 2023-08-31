import * as React from 'react';
import CreateTopicModal from '../../components/study/topics/CreateTopicsModal';
import CreateFlashcardModal from '../../components/study/flashcards/CreateFlashcardModal';
import FlashcardTable from '../../components/study/flashcards/FlashcardTable';
import TopicTable from '../../components/study/topics/TopicTable';

export default function Study() {


  return (
    <>
      {/* <Layout /> */}
      <CreateTopicModal />
      <TopicTable />
    </>
  );
}