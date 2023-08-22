import React, { useContext, useEffect, useState, ChangeEvent } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Skeleton, Grid } from '@mui/material/'
import { Link } from 'react-router-dom'
import TablePagination from '@mui/material/TablePagination';
import { Box } from '@mui/system';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../../features/auth/AuthContext';
import { GET_PROJECTS_BY_USER } from '../../features/projects/projectQueries';

type projectType = {
    id: string,
    owner: string,
    title: string,
    description: string,
    members: [string],
    created_at: string,
}

function ProjectTable() {


    const { token } = useContext(AuthContext)
    const { data, loading, error, refetch } = useQuery(GET_PROJECTS_BY_USER, {
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
    
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)



    console.log(data.getProjectsByUser)
    

  return (
    <>
        <TableContainer  component={Paper} style={{marginLeft: "5%", marginTop: "5%", backgroundColor: "#43454a"}}>
            <Table aria-label="simple table" >
            <TableHead >
                <TableRow  sx={{height: "2.5rem"}}>
                <TableCell style={{}}>Title</TableCell>
                <TableCell style={{}}>Description</TableCell>
                <TableCell ></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.getProjectsByUser
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((project: projectType, index: number) => (
                <TableRow
                    key={project.id}
                    sx={{ height: "4.5rem", '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell style={{}}>{project.title}</TableCell>
                    <TableCell style={{}}>{project.description}</TableCell>
                    <TableCell style={{}}>
                    <Link to={`/projects/${project.id}/`}>
                        <Button>
                        View
                        </Button>
                    </Link>
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.getProjectsByUser.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    </>
  )
}



export default ProjectTable