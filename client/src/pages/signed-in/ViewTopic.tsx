import * as React from 'react';
import { Stack } from '@mui/material';
import TopicCard from '../../components/study/topics/TopicCard';
import CreateFlashcardModal from '../../components/study/flashcards/CreateFlashcardModal';
import FlashcardTable from '../../components/study/flashcards/FlashcardTable';

export default function ViewTopic() {


  return (
    <>
        <Stack direction="column" spacing={2}>
            <CreateFlashcardModal />
            <FlashcardTable />
            {/* <TopicCard /> */}
        </Stack>
    </>
  );
}