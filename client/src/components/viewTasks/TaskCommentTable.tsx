import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, useTheme } from '@mui/material';
import React, { useContext, ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../features/auth/AuthContext';
import { useQuery } from '@apollo/client';
import { GET_TASK_EVENTS } from '../../features/tasks/taskQueries';
import { formatDate } from '../../utils';
import { GET_COMMENTS_BY_TASK } from '../../features/comments/commentQueries';

type commentType = {
    comment_id: string,
    task_id: string,
    user_id: string,
    description: string,
    image: string,
    created_at: string,
}


function TaskCommentTable() {

    const { taskId } = useParams()

    const { token } = useContext(AuthContext)
    const { data, loading, error, } = useQuery(GET_COMMENTS_BY_TASK, {
        variables: { id: taskId},
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })
    
    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    if(loading) return <div>Loading</div>
    if(error) return <div>Error</div>
  
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
  
    const emptyRows = data.getTaskEvents ? rowsPerPage - Math.min(rowsPerPage, data.getTaskEvents.length - page * rowsPerPage) : 0

    return (
        <>  
            <Grid container >
                
                <TableContainer component={Paper}>
                <Table aria-label="simple table" >
                    <TableHead style={{}}>
                        <TableRow >
                            <TableCell sx={{ fontWeight: "bold", fontSize: "20px"}}>Comment Id</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontSize: "20px"}}>Made By</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontSize: "20px"}}>Description</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontSize: "20px"}}>Attachments</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontSize: "20px"}}>Created</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontSize: "20px"}}></TableCell>
                        </TableRow>
                    </TableHead>
                <TableBody>
                    {data.getCommentsByTask
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((comment: commentType, index: number) => (
                    <TableRow
                        key={index}
                        sx={{ height: "4.5rem", '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell sx={{paddingleft: "3", paddingRight: "3", width: "50%", paddingBottom: '0', paddingTop: "0"}}>{comment.comment_id}</TableCell>
                        <TableCell sx={{paddingleft: "3", paddingRight: "3", width: "25%", paddingBottom: '0', paddingTop: "0"}}>{comment.user_id}</TableCell>
                        {/* <TableCell sx={{paddingleft: "3", paddingRight: "3", width: "25%", paddingBottom: '0', paddingTop: "0"}}>
                            
                            {comment.image ? <CommentImageModal image={comment.image}/> : "No Attachments"}
                        </TableCell> */}
                        <TableCell sx={{paddingleft: "3", paddingRight: "3", width: "10%", paddingBottom: '0', paddingTop: "0"}}>{formatDate(comment.description)}</TableCell>
                        <TableCell sx={{paddingleft: "3", paddingRight: "3", width: "10%", paddingBottom: '0', paddingTop: "0"}}>
                        {/* <Button onClick={(e) => {
                            dispatch(deleteComment(comment._id))
                            dispatch(reset())
                            window.location.reload()
                        }}>
                            delete
                        </Button> */}
                        </TableCell>
                        <TableCell sx={{paddingleft: "3", paddingRight: "3", width: "25%", paddingBottom: '0', paddingTop: "0"}}>{comment.created_at}</TableCell>
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
                    count={data.getCommentsByTask.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </TableContainer>
            </Grid>
        </>
  )
}

export default TaskCommentTable