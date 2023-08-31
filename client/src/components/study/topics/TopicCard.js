import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { AuthContext } from '../../../features/auth/AuthContext';
import { GET_TOPIC } from '../../../features/topics/topicQueries';
import { DELETE_TOPIC } from '../../../features/topics/topicMutations';
export default function TopicCard() {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const { data, loading, error, } = useQuery(GET_TOPIC, {
        variables: { id: topicId },
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    });
    const [deleteTask] = useMutation(DELETE_TOPIC, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    });
    if (loading)
        return React.createElement("div", null, "Loading");
    if (error)
        return React.createElement("div", null, "error");
    let title;
    if (data.getTopic) {
        ({ title } = data.getTopic);
    }
    const handleDeleteTask = () => {
        deleteTask({ variables: { id: topicId } })
            .then((result) => {
            console.log(result.data.deleteTask.message);
            navigate('/study');
        })
            .catch((error) => {
            console.log("Failed to delete task");
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Card, { style: { maxWidth: 400, border: "1px solid white", borderRadius: "5%", marginLeft: "5%", backgroundColor: "#43454a" } },
            React.createElement(CardContent, null,
                React.createElement(Grid, { container: true, spacing: 3 },
                    React.createElement(Grid, { item: true, xs: 12 },
                        React.createElement(Typography, { variant: "h5", component: "h2", sx: { color: "white" } }, title)),
                    React.createElement(Grid, { item: true },
                        React.createElement(Link, { to: `/tasks/edit/${topicId}` },
                            React.createElement(Button, { color: "primary", style: { textDecoration: "none" } }, "Edit Task"))),
                    React.createElement(Grid, { item: true },
                        React.createElement(Button, { variant: "contained", color: "error", onClick: handleDeleteTask }, "Delete Task")))))));
}
