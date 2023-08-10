import React from 'react';
import { useState, useContext } from 'react';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { AuthContext } from '../features/auth/AuthContext';
import { QUERY_USERS } from '../features/auth/userQueries';
import { useQuery } from '@apollo/client';
export default function SearchUsersCard({ handleAddMember }) {
    const { token } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const { data, loading, error } = useQuery(QUERY_USERS, {
        variables: { input: { searchQuery, pageNumber } },
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    });
    let members;
    if (data) {
        members = data.queryUsers;
    }
    // if(loading) return <div>Loading</div>
    if (error)
        return React.createElement("div", null, "Error");
    return (React.createElement(Grid, { sx: { display: "flex", width: "100%", flexDirection: "column", height: 450, justifyContent: "center" } },
        React.createElement(TextField, { id: "search user", label: "Search for a user", type: "text", name: "searchQuery", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), sx: { backgroundColor: "#9C9C9C", borderRadius: "10px" } }),
        React.createElement(Grid, { sx: { height: "60%", overflowY: "auto", marginTop: "10%" } }, members && members.map((member, index) => {
            return (React.createElement(Grid, { sx: { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", maxHeight: "30vh", padding: 1 } },
                React.createElement(Stack, { direction: "column", sx: { width: "70%", backgroundColor: "#9C9C9C", borderRadius: "10px" } },
                    React.createElement(Typography, { sx: { padding: "1%" } }, member.username),
                    React.createElement(Typography, { sx: { padding: "1%" } }, member.email)),
                React.createElement(Button, { sx: { color: "black", backgroundColor: "#a9f6ae", border: "1px solid black", borderRadius: "10%", '&:hover': { backgroundColor: "#86c48a" } }, onClick: () => handleAddMember(member.username) }, "Add")));
        }))));
}
