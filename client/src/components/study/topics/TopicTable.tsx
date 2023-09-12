
import React, { useContext, useEffect, useState, ChangeEvent } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Skeleton, TableSortLabel, Grid } from '@mui/material/'
import { Link } from 'react-router-dom'
import TablePagination from '@mui/material/TablePagination';
import { Box } from '@mui/system';
import { useMutation, useQuery } from '@apollo/client';
import { AuthContext } from '../../../features/auth/AuthContext';
import { GET_TOPICS_BY_USER } from '../../../features/topics/topicQueries';
import { DELETE_TOPIC } from '../../../features/topics/topicMutations';
// import { formatDate } from '../../utils';

type topicType = {
    topic_id: string,
    title: string,
}

export default function TopicTable() {


    const { token } = useContext(AuthContext)
    const { data, loading, error, refetch } = useQuery(GET_TOPICS_BY_USER, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })

    const [ deleteTopic ] = useMutation(DELETE_TOPIC, {
      context: {
          headers: {
              authorization: `Bearer ${token}`
          }
      }
    })

    const { refetch: refetchTopics } = useQuery(GET_TOPICS_BY_USER, {
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });

    
    // const [orderBy, setOrderBy] = useState<"title" | "description" | "priority" | "status" | "deadline" | "created_at">("created_at");
    // const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("desc");
    // const [sortedTasks, setSortedTasks] = useState<taskType[]>([])
    // const [hasUserSorted, setHasUserSorted] = useState(false)
    
    
    
    //   const taskArray = Array.from(tasks)
    // console.log(taskArray)
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    // useEffect(() => {
    //   if(data && data.getTasksByUser) {
    //     const sortedTasks = [...data.getTasksByUser].sort((a, b) => {
    //       let comparison = 0;
    //       switch(orderBy) {
    //           case "title":
    //               comparison = a.title.localeCompare(b.title)
    //               break;
    //           case "description":
    //               comparison = a.description.localeCompare(b.description)
    //               break;
    //           case "priority":
    //               comparison = a.priority.localeCompare(b.priority);
    //               break;
    //           case "status":
    //               comparison = a.status.localeCompare(b.status);
    //               break;
    //           case "deadline":
    //             comparison = new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    //             break;
    //             case "created_at":
    //               comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    //               break;
    //             }
    
    //       return orderDirection === "asc" ? comparison : -comparison;
    //     });
    //     setSortedTasks(sortedTasks)
    //   }
    // }, [data, orderBy, orderDirection])

    if(loading) return <div>Loading</div>
    if(error) return <div>error</div>
    if(!data.getTopicsByUser || !data) return <div>No data</div>
    
    // const handleSortRequest = (property: "title" | "description" | "priority" | "status" | "deadline" | "created_at") => {
    //     setHasUserSorted(true)
    //     setOrderDirection(orderDirection === "asc" ? 'desc' : 'asc');
    //     setOrderBy(property);
    //   };

      
      

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleDeleteTopic = (id: string) => {
        deleteTopic({ variables: { id: id}})
        refetchTopics()
    }

    
    const emptyRows = data.getTopicsByUser ? rowsPerPage - Math.min(rowsPerPage, data.getTopicsByUser.length - page * rowsPerPage) : 0
    // const taskToDisplay = sortedTasks



    return (
      <>
        <Box flex={5} p={1} m={2} sx={{ display: {lg: "block"  } }}>
          <TableContainer component={Paper} sx={{ backgroundColor: "#373c43", height: "40vh", width: "40vw"}}>
            <Table aria-label="simple table" >
              <TableHead sx={{ border: "1px solid white", borderRadius: "2px"}}>
                <TableRow sx={{height: "7.5vh" }}>
                  <TableCell 
                    sx={{ fontWeight: "bold", fontSize: "20px", color: "white", width: "10vw"}}
                    key="title"
                    >
                      <Grid sx={{display: "flex", flexDirection: "row"}}>
                      Topic
                    </Grid>
                    </TableCell>
                  <TableCell sx={{ widht: "10vw" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ border: "1px solid white"}} >
                {data.getTopicsByUser
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((topic: topicType, index: number) => (
                  <TableRow
                    key={topic.topic_id}
                    
                    sx={{ 
                      height: "7.5vh",
                      '&:nth-of-type(odd)': {
                        backgroundColor: "#43454a"
                      },
                      '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell sx={{ color: "white", overflow: "hidden", width: "10vw" }}>{topic.title}</TableCell>
                    
                    <TableCell sx={{ width: "8vw"}}>
                      {/* <Link to={`/editTask/${task._id}/`}>
                        <Button>
                          Edit
                        </Button>
                      </Link> */}
                      <Link to={`/study/${topic.topic_id}/`} style={{ textDecoration: "none"}}>
                        <Button>
                          View
                        </Button>
                      </Link>
                      <Button variant="contained" color="error" onClick={() => handleDeleteTopic(topic.topic_id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 72 * emptyRows}}>
                    <TableCell colSpan={6}></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          <TablePagination 
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={data.getTopicsByUser.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ color: "white"}}
          />
          </TableContainer>
        </Box>
      </>
    )
}