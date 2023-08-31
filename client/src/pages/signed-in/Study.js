import * as React from 'react';
import CreateTopicModal from '../../components/study/topics/CreateTopicsModal';
import TopicTable from '../../components/study/topics/TopicTable';
export default function Study() {
    return (React.createElement(React.Fragment, null,
        React.createElement(CreateTopicModal, null),
        React.createElement(TopicTable, null)));
}
