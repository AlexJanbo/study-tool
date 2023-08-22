import React, { useContext, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TableSortLabel, Grid } from '@mui/material/';
import { Link } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import { Box } from '@mui/system';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../../features/auth/AuthContext';
import { GET_TASKS_BY_USER } from '../../features/tasks/taskQueries';
import { formatDate } from '../../utils';
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
    const [orderBy, setOrderBy] = useState("created_at");
    const [orderDirection, setOrderDirection] = useState("desc");
    const [sortedTasks, setSortedTasks] = useState([]);
    const [hasUserSorted, setHasUserSorted] = useState(false);
    //   const taskArray = Array.from(tasks)
    // console.log(taskArray)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    useEffect(() => {
        if (data && data.getTasksByUser) {
            const sortedTasks = [...data.getTasksByUser].sort((a, b) => {
                let comparison = 0;
                switch (orderBy) {
                    case "title":
                        comparison = a.title.localeCompare(b.title);
                        break;
                    case "description":
                        comparison = a.description.localeCompare(b.description);
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
                return orderDirection === "asc" ? comparison : -comparison;
            });
            setSortedTasks(sortedTasks);
        }
    }, [data, orderBy, orderDirection]);
    if (loading)
        return React.createElement("div", null, "Loading");
    if (error)
        return React.createElement("div", null, "error");
    const handleSortRequest = (property) => {
        setHasUserSorted(true);
        setOrderDirection(orderDirection === "asc" ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows = data.getTasksByUser ? rowsPerPage - Math.min(rowsPerPage, data.getTasksByUser.length - page * rowsPerPage) : 0;
    const taskToDisplay = sortedTasks;
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { flex: 5, p: 1, m: 2, style: { marginTop: "5%" }, sx: { display: { lg: "block" } } },
            React.createElement(TableContainer, { component: Paper, sx: { backgroundColor: "#373c43", height: "90vh", width: "80vw" } },
                React.createElement(Table, { "aria-label": "simple table" },
                    React.createElement(TableHead, { sx: { border: "1px solid white", borderRadius: "2px" } },
                        React.createElement(TableRow, { sx: { height: "7.5vh" } },
                            React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px", color: "white", width: "10vw" }, key: "title", sortDirection: orderBy === "title" ? orderDirection : false },
                                React.createElement(Grid, { sx: { display: "flex", flexDirection: "row" } },
                                    "Title",
                                    React.createElement(TableSortLabel, { active: orderBy === "title", direction: orderDirection, onClick: () => handleSortRequest("title"), sx: { color: "white" } }))),
                            React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px", color: "white", width: "30vw" }, key: "description", sortDirection: orderBy === "description" ? orderDirection : false },
                                React.createElement(Grid, { sx: { display: "flex", flexDirection: "row" } },
                                    "Description",
                                    React.createElement(TableSortLabel, { active: orderBy === "description", direction: orderDirection, onClick: () => handleSortRequest("description") }))),
                            React.createElement(TableCell, { key: "priority", sx: { fontWeight: "bold", fontSize: "20px", color: "white", width: "8vw" }, sortDirection: orderBy === "priority" ? orderDirection : false },
                                React.createElement(Grid, { sx: { display: "flex", flexDirection: "row" } },
                                    "Priority",
                                    React.createElement(TableSortLabel, { active: orderBy === "priority", direction: orderDirection, onClick: () => handleSortRequest("priority") }))),
                            React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px", color: "white", width: "8vw" }, key: "status", sortDirection: orderBy === "status" ? orderDirection : false },
                                React.createElement(Grid, { sx: { display: "flex", flexDirection: "row" } },
                                    "Status",
                                    React.createElement(TableSortLabel, { active: orderBy === "status", direction: orderDirection, onClick: () => handleSortRequest("status") }))),
                            React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px", color: "white", width: "8vw" }, key: "deadline", sortDirection: orderBy === "deadline" ? orderDirection : false },
                                React.createElement(Grid, { sx: { display: "flex", flexDirection: "row" } },
                                    "Deadline",
                                    React.createElement(TableSortLabel, { active: orderBy === "deadline", direction: orderDirection, onClick: () => handleSortRequest("deadline") }))),
                            React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px", color: "white", width: "8vw" }, key: "created_at", sortDirection: orderBy === "created_at" ? orderDirection : false },
                                React.createElement(Grid, { sx: { display: "flex", flexDirection: "row" } },
                                    "Created",
                                    React.createElement(TableSortLabel, { active: orderBy === "created_at", direction: orderDirection, onClick: () => handleSortRequest("created_at") }))),
                            React.createElement(TableCell, { sx: { widht: "8vw" } }))),
                    React.createElement(TableBody, { sx: { border: "1px solid white" } },
                        taskToDisplay
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((task, index) => (React.createElement(TableRow, { key: task.id, sx: {
                                height: "7.5vh",
                                '&:nth-child(odd)': {
                                    backgroundColor: "#43454a"
                                },
                                '&:last-child td, &:last-child th': { border: 0 }
                            } },
                            React.createElement(TableCell, { sx: { color: "white", width: "10vw" } }, task.title),
                            React.createElement(TableCell, { sx: { color: "white", overflow: "hidden", width: "30vw" } }, task.description),
                            React.createElement(TableCell, { sx: { color: "white", width: "8vw" } }, task.priority),
                            React.createElement(TableCell, { sx: { color: "white", width: "8vw" } },
                                task.status === "Completed" && React.createElement(CheckBoxIcon, { color: "success" }),
                                task.status === "InProgress" && "In Progress",
                                task.status === "Created" && task.status),
                            React.createElement(TableCell, { sx: { color: "white", width: "8vw" } }, task.deadline ? formatDate(task.deadline) : "No deadline"),
                            React.createElement(TableCell, { sx: { color: "white", width: "8vw" } }, formatDate(task.created_at)),
                            React.createElement(TableCell, { sx: { width: "8vw" } },
                                React.createElement(Link, { to: `/tasks/${task.id}/`, style: { textDecoration: "none" } },
                                    React.createElement(Button, null, "View")))))),
                        emptyRows > 0 && (React.createElement(TableRow, { style: { height: 72 * emptyRows } },
                            React.createElement(TableCell, { colSpan: 6 }))))),
                React.createElement(TablePagination, { rowsPerPageOptions: [5, 10], component: "div", count: data.getTasksByUser.length, rowsPerPage: rowsPerPage, page: page, onPageChange: handleChangePage, onRowsPerPageChange: handleChangeRowsPerPage, sx: { color: "white" } })))));
}
export default TaskTable;
