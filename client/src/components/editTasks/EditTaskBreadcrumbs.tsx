import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useParams } from 'react-router-dom'

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function EditTaskBreadcrumbs() {

    const { taskId } = useParams()

    return (
        <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
            <Link to={'/tasks'}>
                Tasks
            </Link>
            <Link to={`/tasks/${taskId}`}>
                <Typography>{taskId}</Typography>
            </Link>
            <Link to={`/tasks/edit/${taskId}`}>
                <Typography>Edit</Typography>
            </Link>
        </Breadcrumbs>
        </div>
  );
}