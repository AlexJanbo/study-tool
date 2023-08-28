import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useParams } from 'react-router-dom'
import { Grid } from '@mui/material';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function EditProjectBreadcrumbs() {

    const { projectId } = useParams()

    return (
        <Grid p={1} m={2} sx={{ marginTop: "5%", marginLeft: "5%"}}>
            <div role="presentation" onClick={handleClick}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white"}}>
                    <Link to={'/projects'} style={{ textDecoration: "none"}}>
                        <Typography sx={{ color: "white"}}>Back to Projects</Typography>
                    </Link>
                    <Link to={`/projects/${projectId}`} style={{ textDecoration: "none"}}>
                        <Typography sx={{ color: "white"}}>View Project</Typography>
                    </Link>
                    <Link to={`/projects/edit/${projectId}`} style={{ textDecoration: "none"}}>
                        <Typography sx={{ color: "white"}}>Edit Project</Typography>
                    </Link>
                </Breadcrumbs>
            </div>
        </Grid>
  );
}