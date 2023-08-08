import React, { useContext, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material/';
import { Link } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import { Box } from '@mui/system';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../../features/auth/AuthContext';
import { GET_TASKS_BY_USER } from '../../features/tasks/taskQueries';
function TaskTable() {
    const { token } = useContext(AuthContext);
    const { data, loading, error, refetch } = useQuery(GET_TASKS_BY_USER, {
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
    console.log(data.getTasksByUser);
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { flex: 5, p: 1, m: 2, style: { marginTop: "5%" }, sx: { display: { lg: "block" } } },
            React.createElement(TableContainer, { component: Paper, style: {} },
                React.createElement(Table, { "aria-label": "simple table" },
                    React.createElement(TableHead, null,
                        React.createElement(TableRow, { sx: { height: "2.5rem" } },
                            React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px" } }, "Task Title"),
                            React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px" } }, "Description"),
                            React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px" }, key: "priority" }, "Priority"),
                            React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px" }, key: "status" }, "Status"),
                            React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px" } }, "Deadline"),
                            React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px" }, key: "created" }, "Created"),
                            React.createElement(TableCell, { sx: {} }))),
                    React.createElement(TableBody, null,
                        data.getTasksByUser
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((task, index) => (React.createElement(TableRow, { key: task.id, sx: { height: "4.5rem", '&:last-child td, &:last-child th': { border: 0 } } },
                            React.createElement(TableCell, { style: {} }, task.title),
                            React.createElement(TableCell, { style: {} }, task.description),
                            React.createElement(TableCell, { style: {} }, task.priority),
                            React.createElement(TableCell, { style: {} }, task.status === "completed" ? (React.createElement(CheckBoxIcon, { color: "success" })) : task.status === "InProgress" ? (React.createElement(Typography, null, "In Progress")) : (task.status)),
                            React.createElement(TableCell, { style: {} }, task.deadline ? new Date(task.deadline).toLocaleDateString('en-US') : "No deadline"),
                            React.createElement(TableCell, { style: {} }, task.created_at),
                            React.createElement(TableCell, { sx: { paddingleft: "3", paddingRight: "3", paddingBottom: '0', paddingTop: "0" } },
                                React.createElement(Link, { to: `/tasks/${task.id}/`, style: { textDecoration: "none" } },
                                    React.createElement(Button, null, "View")))))),
                        emptyRows > 0 && (React.createElement(TableRow, { style: { height: 72 * emptyRows } },
                            React.createElement(TableCell, { colSpan: 6 }))))),
                React.createElement(TablePagination, { rowsPerPageOptions: [5, 10], component: "div", count: data.length, rowsPerPage: rowsPerPage, page: page, onPageChange: handleChangePage, onRowsPerPageChange: handleChangeRowsPerPage })))));
}
export default TaskTable;
