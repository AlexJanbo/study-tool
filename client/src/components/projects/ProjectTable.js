import React, { useContext, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Grid } from '@mui/material/';
import { Link } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import { Box } from '@mui/system';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../../features/auth/AuthContext';
import { GET_PROJECTS_BY_USER } from '../../features/projects/projectQueries';
function ProjectTable() {
    const { token } = useContext(AuthContext);
    const { data, loading, error, refetch } = useQuery(GET_PROJECTS_BY_USER, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    });
    useEffect(() => {
        refetch();
    }, []);
    //   const taskArray = Array.from(tasks)
    // console.log(taskArray)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    if (loading)
        return React.createElement("div", null, "Loading");
    if (error)
        return React.createElement("div", null, "error");
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    console.log(data.getProjectsByUser);
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { flex: 5, p: 1, sx: { display: { lg: "block" } } },
            React.createElement(Grid, { style: { marginLeft: "5%", marginRight: "5%", marginTop: "7%", height: "4rem", border: "2px solid black", borderRadius: "1rem" } },
                React.createElement(Typography, { variant: "h3", style: { paddingTop: ".2rem", textAlign: "center" } }, "My Projects!")),
            React.createElement(TableContainer, { component: Paper, style: {} },
                React.createElement(Table, { "aria-label": "simple table" },
                    React.createElement(TableHead, null,
                        React.createElement(TableRow, { sx: { height: "2.5rem" } },
                            React.createElement(TableCell, { style: {} }, "Title"),
                            React.createElement(TableCell, { style: {} }, "Description"),
                            React.createElement(TableCell, null))),
                    React.createElement(TableBody, null,
                        data.getProjectsByUser
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((project, index) => (React.createElement(TableRow, { key: project.id, sx: { height: "4.5rem", '&:last-child td, &:last-child th': { border: 0 } } },
                            React.createElement(TableCell, { style: {} }, project.title),
                            React.createElement(TableCell, { style: {} }, project.description),
                            React.createElement(TableCell, { style: {} },
                                React.createElement(Link, { to: `/projects/${project.id}/` },
                                    React.createElement(Button, null, "View")))))),
                        emptyRows > 0 && (React.createElement(TableRow, { style: { height: 72 * emptyRows } },
                            React.createElement(TableCell, { colSpan: 6 }))))),
                React.createElement(TablePagination, { rowsPerPageOptions: [5, 10, 25], component: "div", count: data.getProjectsByUser.length, rowsPerPage: rowsPerPage, page: page, onPageChange: handleChangePage, onRowsPerPageChange: handleChangeRowsPerPage })))));
}
export default ProjectTable;
