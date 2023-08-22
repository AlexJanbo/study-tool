import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useParams } from 'react-router-dom'
import { Grid } from '@mui/material';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function ViewTaskBreadcrumbs() {

    const { taskId } = useParams()

    return (
        <Grid p={1} m={2} sx={{ marginTop: "5%", marginLeft: "5%"}}>
            <div role="presentation" onClick={handleClick}>
                <Breadcrumbs sx={{ color: "white"}}>
                    <Link to={'/tasks'} style={{ textDecoration: "none"}}>
                        <Typography sx={{ color: "white"}}>Back to Tasks</Typography>
                    </Link>
                    <Link to={`/tasks/${taskId}`} style={{ textDecoration: "none"}}>
                        <Typography sx={{ color: "white"}}>View Tasks</Typography>
                    </Link>
                </Breadcrumbs>
            </div>
        </Grid>
  );
}