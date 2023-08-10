import React from 'react'
import { useEffect, useState, useRef, useContext } from 'react'
import { Button, Grid, Stack, TextField, Typography, Menu } from '@mui/material'
import AvatarCircle from './AvatarCircle'
import { AuthContext } from '../features/auth/AuthContext'
import { QUERY_USERS } from '../features/auth/userQueries'
import { useQuery } from '@apollo/client'

type MemberType = {
  id: string,
  username: string,
  email: string
}

interface SearchUsersCardProps {
  handleAddMember: (member: string) => void
}

export default function SearchUsersCard({handleAddMember}: SearchUsersCardProps) {



    const { token } = useContext(AuthContext)
    const [ searchQuery, setSearchQuery ] = useState('')
    const [ pageNumber, setPageNumber ] = useState(1)


    const { data, loading, error} = useQuery(QUERY_USERS, {
        variables: { input: { searchQuery, pageNumber }},
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })

    let members
    if(data) {
      members = data.queryUsers
    }

    // if(loading) return <div>Loading</div>
    if(error) return <div>Error</div>
  
    return (
        <Grid sx={{ display: "flex", width: "100%", flexDirection: "column", height: 450, justifyContent: "center"}}>
            <TextField
              id="search user"
              label="Search for a user"
              type="text"
              name="searchQuery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ backgroundColor: "#9C9C9C", borderRadius: "10px"}}
            />
            <Grid sx={{ height: "60%", overflowY: "auto", marginTop: "10%"}}>
              {members && members.map((member: MemberType, index: number) => {
                return (
                  <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", maxHeight: "30vh", padding: 1}}>
                    {/* <AvatarCircle image={member.image} /> */}
                    <Stack direction="column" sx={{ width: "70%", backgroundColor: "#9C9C9C", borderRadius: "10px"}}>
                      <Typography sx={{ padding: "1%"}}>{member.username}</Typography>
                      <Typography sx={{ padding: "1%"}}>{member.email}</Typography>
                    </Stack>
                    <Button sx={{ color: "black", backgroundColor: "#a9f6ae", border: "1px solid black", borderRadius: "10%", '&:hover': { backgroundColor: "#86c48a" }}} onClick={() => handleAddMember(member.username)}>Add</Button>
                  </Grid>
                )
              })}
            </Grid>
        </Grid>
  )
}