import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../../features/auth/AuthContext';
import { useMutation, useQuery } from '@apollo/client';
import { formatDate } from '../../utils';
import { GET_COMMENTS_BY_TASK } from '../../features/comments/commentQueries';
import { DELETE_COMMENT } from '../../features/comments/commentMutations';
import CommentImageModal from './CommentImageModal';
function TaskCommentTable() {
    const { taskId } = useParams();
    const { token } = useContext(AuthContext);
    const { data, loading, error } = useQuery(GET_COMMENTS_BY_TASK, {
        variables: { id: taskId },
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    });
    const [deleteComment] = useMutation(DELETE_COMMENT, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        },
    });
    const { refetch: refetchComments } = useQuery(GET_COMMENTS_BY_TASK, {
        variables: { id: taskId },
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            },
        },
    });
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    if (loading)
        return React.createElement("div", null, "Loading");
    if (error)
        return React.createElement("div", null, "Error");
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows = data.getTaskEvents ? rowsPerPage - Math.min(rowsPerPage, data.getTaskEvents.length - page * rowsPerPage) : 0;
    return (React.createElement(React.Fragment, null,
        React.createElement(Grid, { container: true },
            React.createElement(TableContainer, { component: Paper },
                React.createElement(Table, { "aria-label": "simple table" },
                    React.createElement(TableHead, { style: {} },
                        React.createElement(TableRow, null,
                            React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px" } }, "Comment Id"),
                            React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px" } }, "Made By"),
                            React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px" } }, "Description"),
                            React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px" } }, "Attachments"),
                            React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px" } }, "Created"),
                            React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px" } }))),
                    React.createElement(TableBody, null,
                        data.getCommentsByTask
                            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((comment, index) => (React.createElement(TableRow, { key: index, sx: { height: "4.5rem", '&:last-child td, &:last-child th': { border: 0 } } },
                            React.createElement(TableCell, { sx: { paddingleft: "3", paddingRight: "3", width: "50%", paddingBottom: '0', paddingTop: "0" } }, comment.comment_id),
                            React.createElement(TableCell, { sx: { paddingleft: "3", paddingRight: "3", width: "25%", paddingBottom: '0', paddingTop: "0" } }, comment.user_id),
                            React.createElement(TableCell, { sx: { paddingleft: "3", paddingRight: "3", width: "10%", paddingBottom: '0', paddingTop: "0" } }, comment.description),
                            React.createElement(TableCell, { sx: { paddingleft: "3", paddingRight: "3", width: "10%", paddingBottom: '0', paddingTop: "0" } },
                                comment.image ? React.createElement(CommentImageModal, { image: comment.image }) : "No Attachments",
                                "comment"),
                            React.createElement(TableCell, { sx: { paddingleft: "3", paddingRight: "3", width: "25%", paddingBottom: '0', paddingTop: "0" } }, formatDate(comment.created_at)),
                            React.createElement(TableCell, { sx: { paddingleft: "3", paddingRight: "3", width: "25%", paddingBottom: '0', paddingTop: "0" } },
                                React.createElement(Button, { onClick: () => {
                                        deleteComment({
                                            variables: { id: comment.comment_id }
                                        })
                                            .then(() => {
                                            refetchComments();
                                        })
                                            .catch((error) => {
                                            console.log(error);
                                        });
                                    } }, "delete"))))),
                        emptyRows > 0 && (React.createElement(TableRow, { style: { height: 72 * emptyRows } },
                            React.createElement(TableCell, { colSpan: 6 }))))),
                React.createElement(TablePagination, { rowsPerPageOptions: [5, 10], component: "div", count: data.getCommentsByTask.length, rowsPerPage: rowsPerPage, page: page, onPageChange: handleChangePage, onRowsPerPageChange: handleChangeRowsPerPage })))));
}
export default TaskCommentTable;
