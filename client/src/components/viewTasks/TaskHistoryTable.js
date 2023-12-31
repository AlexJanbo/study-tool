import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../features/auth/AuthContext';
import { useQuery } from '@apollo/client';
import { GET_TASK_EVENTS } from '../../features/tasks/taskQueries';
import { formatDate } from '../../utils';
function TaskHistoryTable() {
    const { taskId } = useParams();
    const navigate = useNavigate();
    console.log(taskId);
    const { token } = useContext(AuthContext);
    const { data, loading, error, } = useQuery(GET_TASK_EVENTS, {
        variables: { id: taskId },
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
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
        React.createElement(TableContainer, { component: Paper, style: { backgroundColor: "#43454a", marginLeft: "5%", border: "1px solid white", borderRadius: "2%" } },
            React.createElement(Table, { "aria-label": "simple table" },
                React.createElement(TableHead, null,
                    React.createElement(TableRow, null,
                        React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px", color: "white" } }, "Event Id"),
                        React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px", color: "white" } }, "Field Changed"),
                        React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px", color: "white" } }, "New Value"),
                        React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px", color: "white" } }, "Old Value"),
                        React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px", color: "white" } }, "Made By"),
                        React.createElement(TableCell, { sx: { fontWeight: "bold", fontSize: "20px", color: "white" } }, "Updated At"))),
                React.createElement(TableBody, null,
                    data.getTaskEvents
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((event, index) => (React.createElement(TableRow, { key: index, sx: { height: "4.5rem", '&:last-child td, &:last-child th': { border: 0 } } },
                        React.createElement(TableCell, { sx: { paddingleft: "3", paddingRight: "3", paddingBottom: '0', paddingTop: "0", color: "white" } }, event.event_id),
                        React.createElement(TableCell, { sx: { paddingleft: "3", paddingRight: "3", paddingBottom: '0', paddingTop: "0", color: "white" } }, event.field_changed),
                        React.createElement(TableCell, { sx: { paddingleft: "3", paddingRight: "3", paddingBottom: '0', paddingTop: "0", color: "white" } }, event.new_value),
                        React.createElement(TableCell, { sx: { paddingleft: "3", paddingRight: "3", paddingBottom: '0', paddingTop: "0", color: "white" } }, event.old_value),
                        React.createElement(TableCell, { sx: { paddingleft: "3", paddingRight: "3", paddingBottom: '0', paddingTop: "0", color: "white" } }),
                        React.createElement(TableCell, { sx: { paddingleft: "3", paddingRight: "3", paddingBottom: '0', paddingTop: "0", color: "white" } }, formatDate(event.updated_at))))),
                    emptyRows > 0 && (React.createElement(TableRow, { style: { height: 72 * emptyRows } },
                        React.createElement(TableCell, { colSpan: 6 }))))),
            React.createElement(TablePagination, { rowsPerPageOptions: [5, 10], component: "div", count: data.getTaskEvents.length, rowsPerPage: rowsPerPage, page: page, onPageChange: handleChangePage, onRowsPerPageChange: handleChangeRowsPerPage, sx: { color: "white" } }))));
}
export default TaskHistoryTable;
