import { Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { AuthContext } from '../../../features/auth/AuthContext'
import { GET_TOPIC } from '../../../features/topics/topicQueries'
import { DELETE_TOPIC } from '../../../features/topics/topicMutations'


export default function TopicCard() {

    const { topicId } = useParams()
    const navigate = useNavigate()

    const { token } = useContext(AuthContext)
    const { data, loading, error, } = useQuery(GET_TOPIC, {
        variables: { id: topicId},
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })

    const [ deleteTask ] = useMutation(DELETE_TOPIC, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })
    
    if(loading) return <div>Loading</div>
    if(error) return <div>error</div>

    let title 
    if(data.getTopic) {(
        { title } = data.getTopic
    )}


    const handleDeleteTask = () => {
        deleteTask({ variables: { id: topicId}})
            .then((result) => {
                console.log(result.data.deleteTask.message)
                navigate('/study')
            })
            .catch((error) => {
                console.log("Failed to delete task")
            })
    }



    return (
        <>
            <Card style={{ maxWidth: 400, border: "1px solid white", borderRadius: "5%", marginLeft: "5%", backgroundColor: "#43454a" }}>
                <CardContent >
                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <Typography variant="h5" component="h2" sx={{ color: "white"}}>
                        {title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Link to={`/tasks/edit/${topicId}`}>
                            <Button color="primary" style={{ textDecoration: "none"}}>
                                Edit Task
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="error" onClick={handleDeleteTask} >
                            Delete Task
                        </Button> 
                    </Grid>
                </Grid>
                </CardContent>
            </Card>
        </>
  )
}
