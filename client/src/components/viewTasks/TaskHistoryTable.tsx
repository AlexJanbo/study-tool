import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, useTheme } from '@mui/material';
import React, { useContext, ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../features/auth/AuthContext';
import { useQuery } from '@apollo/client';
import { GET_TASK_EVENTS } from '../../features/tasks/taskQueries';
import { formatDate } from '../../utils';

type taskEventType = {
    event_id: string,
    task_id: string,
    field_changed: string,
    old_value: string,
    new_value: string,
    updated_at: string,
}


function TaskHistoryTable() {

    const { taskId } = useParams()
    const navigate = useNavigate()
    console.log(taskId)

    const { token } = useContext(AuthContext)
    const { data, loading, error, } = useQuery(GET_TASK_EVENTS, {
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
            <TableContainer component={Paper} style={{ backgroundColor: "#43454a", marginLeft: "5%", border: "1px solid white", borderRadius: "2%"}}>
                <Table aria-label="simple table" >
                    <TableHead >
                        <TableRow >
                            <TableCell sx={{ fontWeight: "bold", fontSize: "20px", color: "white"}}>Event Id</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontSize: "20px", color: "white"}}>Field Changed</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontSize: "20px", color: "white"}}>New Value</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontSize: "20px", color: "white"}}>Old Value</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontSize: "20px", color: "white"}}>Made By</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontSize: "20px", color: "white"}}>Updated At</TableCell>
                        </TableRow>
                    </TableHead>
                <TableBody>
                    {data.getTaskEvents
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((event: taskEventType, index: number) => (
                    <TableRow
                        key={index}
                        sx={{ height: "4.5rem", '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell sx={{paddingleft: "3", paddingRight: "3", paddingBottom: '0', paddingTop: "0"}}>{event.event_id}</TableCell>
                        <TableCell sx={{paddingleft: "3", paddingRight: "3", paddingBottom: '0', paddingTop: "0"}}>{event.field_changed}</TableCell>
                        <TableCell sx={{paddingleft: "3", paddingRight: "3", paddingBottom: '0', paddingTop: "0"}}>{event.new_value}</TableCell>
                        <TableCell sx={{paddingleft: "3", paddingRight: "3", paddingBottom: '0', paddingTop: "0"}}>{event.old_value}</TableCell>
                        <TableCell sx={{paddingleft: "3", paddingRight: "3", paddingBottom: '0', paddingTop: "0"}}></TableCell>
                        <TableCell sx={{paddingleft: "3", paddingRight: "3", paddingBottom: '0', paddingTop: "0"}}>{formatDate(event.updated_at)}</TableCell>
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
                count={data.getTaskEvents.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </>
  )
}

export default TaskHistoryTable