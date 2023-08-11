import React, { useContext, useEffect, useState, ChangeEvent } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Skeleton } from '@mui/material/'
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
    
    
    //   const taskArray = Array.from(tasks)
    // console.log(taskArray)
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    if(loading) return <div>Loading</div>
    if(error) return <div>error</div>

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    
    const emptyRows = data.getTasksByUser ? rowsPerPage - Math.min(rowsPerPage, data.getTasksByUser.length - page * rowsPerPage) : 0



    return (
      <>
        <Box flex={5} p={1} m={2} style={{ marginTop: "5%" }} sx={{ display: {lg: "block" } }}>
          <TableContainer component={Paper} style={{}}>
            <Table aria-label="simple table" >
              <TableHead>
                <TableRow sx={{height: "2.5rem" }}>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "20px"}}>Task Title</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "20px"}}>Description</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "20px"}} key="priority">
                    Priority
                    {/* <TableSortLabel
                      active={"priority" === "priority"}
                      direction="asc"
                      // onClick={createSortHandler("priority")}
                    >
                    </TableSortLabel> */}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "20px"}} key="status">
                    Status
                    {/* <TableSortLabel
                      active={"status" === "status"}
                      direction="desc"
                      // onClick={createSortHandler("status")}
                    >
                    </TableSortLabel> */}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "20px"}}>Deadline</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "20px"}} key="created">
                    Created
                    {/* <TableSortLabel
                      active={true}
                    >
                    </TableSortLabel> */}
                  </TableCell>
                  <TableCell sx={{}}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {data.getTasksByUser
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
                    <TableCell style={{}}>{task.deadline ? formatDate(new Date(task.deadline)) : "No deadline"}</TableCell>
                    <TableCell style={{}}>{formatDate(new Date(task.created_at))}</TableCell>
                    
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