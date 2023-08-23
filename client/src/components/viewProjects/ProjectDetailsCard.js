import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../features/auth/AuthContext';
import { useMutation, useQuery } from '@apollo/client';
// import { DELETE_TASK } from '../../features/tasks/taskMutations'
import { GET_PROJECT } from '../../features/projects/projectQueries';
import { DELETE_PROJECT } from '../../features/projects/projectMutations';
function ProjectDetailsCard() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    console.log(projectId);
    const { token } = useContext(AuthContext);
    const { data, loading, error, } = useQuery(GET_PROJECT, {
        variables: { id: projectId },
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    });
    const [deleteProject] = useMutation(DELETE_PROJECT, {
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
    const { owner, title, description, members, created_at } = data.getProject;
    const handleDeleteProject = () => {
        deleteProject({ variables: { id: projectId } })
            .then((result) => {
            console.log(result.data.deleteProject.message);
            navigate('/projects');
        })
            .catch((error) => {
            console.log("Failed to delete project");
        });
    };
    const formatDate = (date) => {
        let formattedDate = new Date(date).toLocaleString('en-us', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
        return formattedDate;
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Card, { style: { maxWidth: 400, border: "1px solid white", backgroundColor: "#43454a", borderRadius: "5%", marginLeft: "5%", marginTop: "5%" } },
            React.createElement(CardContent, null,
                React.createElement(Grid, { container: true, spacing: 3 },
                    React.createElement(Grid, { item: true, xs: 12 },
                        React.createElement(Typography, { variant: "h5", component: "h2", sx: { color: "white" } }, title)),
                    React.createElement(Grid, { item: true, xs: 12 },
                        React.createElement(Typography, { variant: "body1", component: "p", sx: { color: "white" } }, description)),
                    React.createElement(Grid, { item: true, xs: 6 },
                        React.createElement(Typography, { variant: "body2", color: "textSecondary", component: "p", sx: { color: "white" } },
                            "Owner: ",
                            owner)),
                    React.createElement(Grid, { item: true, xs: 12 },
                        React.createElement(Typography, { variant: "body2", color: "textSecondary", component: "p", sx: { color: "white" } },
                            "Members: ",
                            members)),
                    React.createElement(Grid, { item: true, xs: 12 },
                        React.createElement(Typography, { variant: "body2", color: "textSecondary", component: "p", sx: { color: "white" } },
                            "Created: ",
                            created_at)),
                    React.createElement(Grid, { item: true },
                        React.createElement(Link, { to: `/projects/edit/${projectId}` },
                            React.createElement(Button, { color: "primary", style: { textDecoration: "none" } }, "Edit Project"))),
                    React.createElement(Grid, { item: true },
                        React.createElement(Button, { variant: "contained", color: "error", onClick: handleDeleteProject }, "Delete Project")))))));
}
export default ProjectDetailsCard;
