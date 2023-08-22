import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useParams } from 'react-router-dom'
import { Grid } from '@mui/material';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function EditTaskBreadcrumbs() {

    const { taskId } = useParams()

    return (
        <Grid p={1} m={2} sx={{ marginTop: "5%", marginLeft: "5%"}}>
            <div role="presentation" onClick={handleClick}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white"}}>
                    <Link to={'/tasks'} style={{ textDecoration: "none"}}>
                        <Typography sx={{ color: "white"}}>Back to Tasks</Typography>
                    </Link>
                    <Link to={`/tasks/${taskId}`} style={{ textDecoration: "none"}}>
                        <Typography sx={{ color: "white"}}>View Task</Typography>
                    </Link>
                    <Link to={`/tasks/edit/${taskId}`} style={{ textDecoration: "none"}}>
                        <Typography sx={{ color: "white"}}>Edit Task</Typography>
                    </Link>
                </Breadcrumbs>
            </div>
        </Grid>
  );
}