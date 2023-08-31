import React, { useContext, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid } from '@mui/material/';
import { Link, useParams } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import { Box } from '@mui/system';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../../../features/auth/AuthContext';
import { GET_FLASHCARDS_BY_TOPIC } from '../../../features/flashcards/flashcardQueries';
import EditFlashcardModal from './EditFlashcardModal';
export default function FlashcardTable() {
    const { topicId } = useParams();
    const { token } = useContext(AuthContext);
    const { data, loading, error, refetch } = useQuery(GET_FLASHCARDS_BY_TOPIC, {
        variables: { id: topicId },
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    });
    useEffect(() => {
        refetch();
    }, []);
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
    if (loading)
        return React.createElement("div", null, "Loading");
    if (error)
        return React.createElement("div", null, "error");
    if (!data.getFlashcardsByTopic || !data)
        return React.createElement("div", null, "No data");
    // const handleSortRequest = (property: "title" | "description" | "priority" | "status" | "deadline" | "created_at") => {
    //     setHasUserSorted(true)
    //     setOrderDirection(orderDirection === "asc" ? 'desc' : 'asc');
    //     setOrderBy(property);
    //   };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows = data.getFlashcardsByTopic ? rowsPerPage - Math.min(rowsPerPage, data.getFlashcardsByTopic.length - page * rowsPerPage) : 0;
    // const taskToDisplay = sortedTasks
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { flex: 5, p: 1, m: 2, sx: { display: { lg: "block" } } },
            React.createElement(TableContainer, { component: Paper, sx: { backgroundColor: "#373c43", height: "90vh", width: "80vw" } },
                React.createElement(Table, { "aria-label": "simple table" },
                    React.createElement(TableHead, { sx: { border: "1px solid white", borderRadius: "2px" } },
                        React.createElement(TableRow, { sx: { height: "7.5vh" } },
                            React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px", color: "white", width: "10vw" }, key: "title" },
                                React.createElement(Grid, { sx: { display: "flex", flexDirection: "row" } }, "Card Type")),
                            React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px", color: "white", width: "10vw" }, key: "description" },
                                React.createElement(Grid, { sx: { display: "flex", flexDirection: "row" } }, "Content")),
                            React.createElement(TableCell, { key: "priority", sx: { fontWeight: "bold", fontSize: "20px", color: "white", width: "10vw" } },
                                React.createElement(Grid, { sx: { display: "flex", flexDirection: "row" } }, "Answer")),
                            React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px", color: "white", width: "10vw" }, key: "status" },
                                React.createElement(Grid, { sx: { display: "flex", flexDirection: "row" } }, "Last Reviewed")),
                            React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px", color: "white", width: "10vw" }, key: "created_at" },
                                React.createElement(Grid, { sx: { display: "flex", flexDirection: "row" } }, "Created")),
                            React.createElement(TableCell, { sx: { widht: "10vw" } }))),
                    React.createElement(TableBody, { sx: { border: "1px solid white" } },
                        data.getFlashcardsByTopic
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((flashcard, index) => (React.createElement(TableRow, { key: flashcard.flashcard_id, sx: {
                                height: "7.5vh",
                                '&:nth-of-type(odd)': {
                                    backgroundColor: "#43454a"
                                },
                                '&:last-child td, &:last-child th': { border: 0 }
                            } },
                            React.createElement(TableCell, { sx: { color: "white", overflow: "hidden", width: "10vw" } }, flashcard.card_type),
                            React.createElement(TableCell, { sx: { color: "white", width: "10vw" } }, flashcard.content),
                            React.createElement(TableCell, { sx: { color: "white", width: "10vw" } }, flashcard.answer),
                            React.createElement(TableCell, { sx: { color: "white", width: "10vw" } }, flashcard.last_reviewed),
                            React.createElement(TableCell, { sx: { color: "white", width: "8vw" } }, flashcard.created_at),
                            React.createElement(TableCell, { sx: { width: "8vw" } },
                                React.createElement(Link, { to: `/flashcard/${flashcard.flashcard_id}/`, style: { textDecoration: "none" } },
                                    React.createElement(Button, null, "Edit")),
                                React.createElement(EditFlashcardModal, { flashcard: flashcard }))))),
                        emptyRows > 0 && (React.createElement(TableRow, { style: { height: 72 * emptyRows } },
                            React.createElement(TableCell, { colSpan: 6 }))))),
                React.createElement(TablePagination, { rowsPerPageOptions: [5, 10], component: "div", count: data.getFlashcardsByTopic.length, rowsPerPage: rowsPerPage, page: page, onPageChange: handleChangePage, onRowsPerPageChange: handleChangeRowsPerPage, sx: { color: "white" } })))));
}
