import { Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../features/auth/AuthContext'
import { useMutation, useQuery } from '@apollo/client'
// import { DELETE_TASK } from '../../features/tasks/taskMutations'
import { GET_PROJECT } from '../../features/projects/projectQueries'
import { DELETE_PROJECT } from '../../features/projects/projectMutations'


function ProjectDetailsCard() {

    const { projectId } = useParams()
    const navigate = useNavigate()
    console.log(projectId)

    const { token } = useContext(AuthContext)
    const { data, loading, error, } = useQuery(GET_PROJECT, {
        variables: { id: projectId},
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })

    const [ deleteProject ] = useMutation(DELETE_PROJECT, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })
    
    if(loading) return <div>Loading</div>
    if(error) return <div>error</div>

    const { owner, title, description, members, created_at } = data.getProject

    const handleDeleteProject = () => {
        deleteProject({ variables: { id: projectId}})
            .then((result) => {
                console.log(result.data.deleteProject.message)
                navigate('/projects')
            })
            .catch((error) => {
                console.log("Failed to delete project")
            })
    }


    const formatDate = (date: Date) => {
        let formattedDate = new Date(date).toLocaleString('en-us', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        })
        return formattedDate
    }


    return (
        <>
            <Card style={{ maxWidth: 400, border: "1px solid white", backgroundColor: "#43454a", borderRadius: "5%", marginLeft: "5%", marginTop: "5%"}}>
                <CardContent >
                <Grid container spacing={3} >
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h2" sx={{ color: "white"}}>
                        {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" component="p" sx={{ color: "white"}}>
                        {description}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary" component="p" sx={{ color: "white"}}>
                        Owner: {owner}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary" component="p" sx={{ color: "white"}}>
                        Members: {members}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary" component="p" sx={{ color: "white"}}>
                            Created: {created_at}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Link to={`/projects/edit/${projectId}`}>
                            <Button color="primary" style={{ textDecoration: "none"}}>
                                Edit Project
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="error" onClick={handleDeleteProject} >
                            Delete Project
                        </Button> 
                    </Grid>
                </Grid>
                </CardContent>
            </Card>
        </>
  )
}

export default ProjectDetailsCard