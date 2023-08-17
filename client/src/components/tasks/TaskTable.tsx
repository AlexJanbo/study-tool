import React, { useContext, useEffect, useState, ChangeEvent } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Skeleton, TableSortLabel, Grid } from '@mui/material/'
import { Link } from 'react-router-dom'
import TablePagination from '@mui/material/TablePagination';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../../features/auth/AuthContext';
import { GET_TASKS_BY_USER } from '../../features/tasks/taskQueries';
import { formatDate } from '../../utils';

type taskType = {
    id: string,
    title: string,
    description: string,
    priority: string,
    status: string,
    deadline: string,
    created_at: string,
}

function TaskTable() {


    const { token } = useContext(AuthContext)
    const { data, loading, error, refetch } = useQuery(GET_TASKS_BY_USER, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })

    useEffect(() => {
      refetch()
    }, [])
    
    const [orderBy, setOrderBy] = useState<"title" | "description" | "priority" | "status" | "deadline" | "created_at">("created_at");
    const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("desc");
    const [sortedTasks, setSortedTasks] = useState<taskType[]>([])
    const [hasUserSorted, setHasUserSorted] = useState(false)
    
    
    
    //   const taskArray = Array.from(tasks)
    // console.log(taskArray)
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    if(loading) return <div>Loading</div>
    if(error) return <div>error</div>
    
    const handleSortRequest = (property: "title" | "description" | "priority" | "status" | "deadline" | "created_at") => {
        setHasUserSorted(true)
        setOrderDirection(orderDirection === "asc" ? 'desc' : 'asc');
        setOrderBy(property);
        setSortedTasks(newSortedTasks)
      };

      
      
      
    const newSortedTasks = [...data.getTasksByUser].sort((a, b) => {
      let comparison = 0;
      switch(orderBy) {
          case "title":
              comparison = a.title.localeCompare(b.title)
              break;
          case "description":
              comparison = a.description.localeCompare(b.description)
              break;
          case "priority":
              comparison = a.priority.localeCompare(b.priority);
              break;
          case "status":
              comparison = a.status.localeCompare(b.status);
              break;
          case "deadline":
            comparison = new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
            break;
            case "created_at":
              comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
              break;
            }

      return orderDirection === "asc" ? -comparison : comparison;
    });

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    
    const emptyRows = data.getTasksByUser ? rowsPerPage - Math.min(rowsPerPage, data.getTasksByUser.length - page * rowsPerPage) : 0
    const taskToDisplay = hasUserSorted ? sortedTasks : data.getTasksByUser



    return (
      <>
        <Box flex={5} p={1} m={2} style={{ marginTop: "5%" }} sx={{ display: {lg: "block" } }}>
          <TableContainer component={Paper} style={{}}>
            <Table aria-label="simple table" >
              <TableHead>
                <TableRow sx={{height: "2.5rem" }}>
                  <TableCell 
                    sx={{ fontWeight: "bold", fontSize: "20px"}}
                    key="title"
                    sortDirection={orderBy === "title" ? orderDirection : false}
                    >
                      <Grid sx={{display: "flex", flexDirection: "row"}}>
                      Title
                      <TableSortLabel
                        active={orderBy === "title"}
                        direction={orderDirection}
                        onClick={() => handleSortRequest("title")}
                      />
                    </Grid>
                    </TableCell>
                  <TableCell 
                    sx={{ fontWeight: "bold", fontSize: "20px"}}
                    key="description"
                    sortDirection={orderBy === "description" ? orderDirection : false}
                    >
                      <Grid sx={{display: "flex", flexDirection: "row"}}>
                      Description
                      <TableSortLabel
                        active={orderBy === "description"}
                        direction={orderDirection}
                        onClick={() => handleSortRequest("description")}
                      />
                    </Grid>
                  </TableCell>
                  <TableCell 
                    key="priority" 
                    sx={{ fontWeight: "bold", fontSize: "20px"}} 
                    sortDirection={orderBy === "priority" ? orderDirection : false}
                  >
                    <Grid sx={{display: "flex", flexDirection: "row"}}>
                      Priority
                      <TableSortLabel
                        active={orderBy === "priority"}
                        direction={orderDirection}
                        onClick={() => handleSortRequest("priority")}
                      />
                    </Grid>
                  </TableCell>
                  <TableCell 
                    sx={{ fontWeight: "bold", fontSize: "20px"}} 
                    key="status"
                    sortDirection={orderBy === "status" ? orderDirection : false}
                  >
                    <Grid sx={{display: "flex", flexDirection: "row"}}>
                      Status
                      <TableSortLabel
                        active={orderBy === "status"}
                        direction={orderDirection}
                        onClick={() => handleSortRequest("status")}
                      />
                    </Grid>
                  </TableCell>
                  <TableCell 
                    sx={{ fontWeight: "bold", fontSize: "20px"}}
                    key="deadline"
                    sortDirection={orderBy === "deadline" ? orderDirection : false}
                  > 
                    <Grid sx={{display: "flex", flexDirection: "row"}}>
                      Deadline
                      <TableSortLabel
                        active={orderBy === "deadline"}
                        direction={orderDirection}
                        onClick={() => handleSortRequest("deadline")}
                      />
                    </Grid>
                  </TableCell>
                  <TableCell 
                    sx={{ fontWeight: "bold", fontSize: "20px"}} 
                    key="created_at"
                    sortDirection={orderBy === "created_at" ? orderDirection : false}
                    >
                      <Grid sx={{ display: "flex", flexDirection: "row"}}>
                        Created
                        <TableSortLabel
                          active={orderBy === "created_at"}
                          direction={orderDirection}
                          onClick={() => handleSortRequest("created_at")}
                        />
                      </Grid>
                  </TableCell>
                  <TableCell sx={{}}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {taskToDisplay
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((task: taskType, index: number) => (
                  <TableRow
                    key={task.id}
                    
                    sx={{ height: "4.5rem", '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell style={{}}>{task.title}</TableCell>
                    <TableCell style={{}}>{task.description}</TableCell>
                    <TableCell style={{}}>{task.priority}</TableCell>
                    <TableCell style={{}}>
                      {task.status === "Completed" && <CheckBoxIcon color="success" />}
                      {task.status === "InProgress" && "In Progress"}
                      {task.status === "Created" && task.status}
                    </TableCell>
                    <TableCell style={{}}>{task.deadline ? formatDate(task.deadline) : "No deadline"}</TableCell>
                    <TableCell style={{}}>{formatDate(task.created_at)}</TableCell>
                    
                    <TableCell sx={{paddingleft: "3", paddingRight: "3", paddingBottom: '0', paddingTop: "0"}}>
                      {/* <Link to={`/editTask/${task._id}/`}>
                        <Button>
                          Edit
                        </Button>
                      </Link> */}
                      <Link to={`/tasks/${task.id}/`} style={{ textDecoration: "none"}}>
                        <Button>
                          View
                        </Button>
                      </Link>
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
            count={data.getTasksByUser.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          </TableContainer>
        </Box>
      </>
    )
}



export default TaskTable