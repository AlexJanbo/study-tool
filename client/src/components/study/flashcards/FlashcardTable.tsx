import React, { useContext, useEffect, useState, ChangeEvent } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Skeleton, TableSortLabel, Grid } from '@mui/material/'
import { Link, useParams } from 'react-router-dom'
import TablePagination from '@mui/material/TablePagination';
import { Box } from '@mui/system';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../../../features/auth/AuthContext';
import { GET_FLASHCARDS_BY_TOPIC  } from '../../../features/flashcards/flashcardQueries';
import EditFlashcardModal from './EditFlashcardModal';
// import { formatDate } from '../../utils';

type flashcardType = {
    flashcard_id: string,
    card_type: string,
    content: string,
    answer: string,
    last_reviewed: string,
    confidence_level: string,
    created_at: string,
}

export default function FlashcardTable() {

    const { topicId } = useParams()

    const { token } = useContext(AuthContext)
    const { data, loading, error, refetch } = useQuery(GET_FLASHCARDS_BY_TOPIC, {
        variables: { id: topicId },
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })

    useEffect(() => {
      refetch()
    }, [])
    
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
    if(!data.getFlashcardsByTopic || !data) return <div>No data</div>
    
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

    
    const emptyRows = data.getFlashcardsByTopic ? rowsPerPage - Math.min(rowsPerPage, data.getFlashcardsByTopic.length - page * rowsPerPage) : 0
    // const taskToDisplay = sortedTasks



    return (
      <>
        <Box flex={5} p={1} m={2} sx={{ display: {lg: "block"  } }}>
          <TableContainer component={Paper} sx={{ backgroundColor: "#373c43", height: "90vh", width: "80vw"}}>
            <Table aria-label="simple table" >
              <TableHead sx={{ border: "1px solid white", borderRadius: "2px"}}>
                <TableRow sx={{height: "7.5vh" }}>
                  <TableCell 
                    sx={{ fontWeight: "bold", fontSize: "20px", color: "white", width: "10vw"}}
                    key="title"
                    // sortDirection={orderBy === "title" ? orderDirection : false}
                    >
                      <Grid sx={{display: "flex", flexDirection: "row"}}>
                      Card Type
                      {/* <TableSortLabel
                        active={orderBy === "title"}
                        direction={orderDirection}
                        onClick={() => handleSortRequest("title")}
                        sx={{ color: "white"}}
                      /> */}
                    </Grid>
                    </TableCell>
                  <TableCell 
                    sx={{ fontWeight: "bold", fontSize: "20px", color: "white", width: "10vw"}}
                    key="description"
                    // sortDirection={orderBy === "description" ? orderDirection : false}
                    >
                      <Grid sx={{display: "flex", flexDirection: "row"}}>
                      Content
                      {/* <TableSortLabel
                        active={orderBy === "description"}
                        direction={orderDirection}
                        onClick={() => handleSortRequest("description")}
                      /> */}
                    </Grid>
                  </TableCell>
                  <TableCell 
                    key="priority" 
                    sx={{ fontWeight: "bold", fontSize: "20px", color: "white", width: "10vw"}} 
                    // 
                  >
                    <Grid sx={{display: "flex", flexDirection: "row"}}>
                      Answer
                      {/* <TableSortLabel
                        active={orderBy === "priority"}
                        direction={orderDirection}
                        onClick={() => handleSortRequest("priority")}
                      /> */}
                    </Grid>
                  </TableCell>
                  <TableCell 
                    sx={{ fontWeight: "bold", fontSize: "20px", color: "white", width: "10vw"}} 
                    key="status"
                    // sortDirection={orderBy === "status" ? orderDirection : false}
                  >
                    <Grid sx={{display: "flex", flexDirection: "row"}}>
                      Last Reviewed
                      {/* <TableSortLabel
                        active={orderBy === "status"}
                        direction={orderDirection}
                        onClick={() => handleSortRequest("status")}
                      /> */}
                    </Grid>
                  </TableCell>
                  <TableCell 
                    sx={{ fontWeight: "bold", fontSize: "20px", color: "white", width: "10vw"}} 
                    key="created_at"
                    // sortDirection={orderBy === "created_at" ? orderDirection : false}
                    >
                      <Grid sx={{ display: "flex", flexDirection: "row"}}>
                        Created
                        {/* <TableSortLabel
                          active={orderBy === "created_at"}
                          direction={orderDirection}
                          onClick={() => handleSortRequest("created_at")}
                        /> */}
                      </Grid>
                  </TableCell>
                  <TableCell sx={{ widht: "10vw" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ border: "1px solid white"}} >
                {data.getFlashcardsByTopic
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((flashcard: flashcardType, index: number) => (
                  <TableRow
                    key={flashcard.flashcard_id}
                    
                    sx={{ 
                      height: "7.5vh",
                      '&:nth-of-type(odd)': {
                        backgroundColor: "#43454a"
                      },
                      '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell sx={{ color: "white", overflow: "hidden", width: "10vw" }}>{flashcard.card_type}</TableCell>
                    <TableCell sx={{ color: "white", width: "10vw"}}>{flashcard.content}</TableCell>
                    <TableCell sx={{ color: "white", width: "10vw"}}>{flashcard.answer}</TableCell>
                    <TableCell sx={{ color: "white", width: "10vw"}}>{flashcard.last_reviewed}</TableCell>
                    <TableCell sx={{ color: "white", width: "8vw"}}>{flashcard.created_at}</TableCell>
                    
                    <TableCell sx={{ width: "8vw"}}>
                      {/* <Link to={`/editTask/${task._id}/`}>
                        <Button>
                          Edit
                        </Button>
                      </Link> */}
                      <Link to={`/flashcard/${flashcard.flashcard_id}/`} style={{ textDecoration: "none"}}>
                        <Button>
                          Edit
                        </Button>
                      </Link>
                      <EditFlashcardModal flashcard={flashcard}/>
                      {/* <Button onClick={() => dispatch(deleteTask(task._id))}>
                        Delete
                      </Button> */}
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
            count={data.getFlashcardsByTopic.length}
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

