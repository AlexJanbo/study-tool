import React, { useState, useContext, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, Divider, Grid, Skeleton, TextField, FormControl } from '@mui/material';
import defaultAvatar from '../images/default-avatar.png'
import SearchUsersCard from '../SearchUsersCard';
import { AuthContext } from '../../features/auth/AuthContext';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECT } from '../../features/projects/projectQueries';
import { ADD_MEMBERS_TO_PROJECT, } from '../../features/projects/projectMutations';
import { useParams } from 'react-router';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  borderRadius: "10%",
  bgcolor: '#676767',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type AddMembersInput = {
    newMembers: string[],
}


export default function AddProjectMembersModal() {

    const { projectId } = useParams()
    const [ open, setOpen ] = useState(false);
    const [ queryUsers, setQueryUsers ] = useState('')
    
    const { token } = useContext(AuthContext)
    
    if(!projectId) {
        throw new Error("Project Id not found")
    }
    const [ addMembersInput, setAddMembersInput ] = useState<AddMembersInput>({ newMembers: [] })
    
    const [ addMembersToProject ] = useMutation(ADD_MEMBERS_TO_PROJECT, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            },
        },
        onCompleted: () => {
            refetchProject()
            handleClose()
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const { refetch: refetchProject } = useQuery(GET_PROJECT, {
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setAddMembersInput({
            newMembers: [],
        })
        setQueryUsers('')
    }

    const handleAddMember = (member: string) => {
        if(addMembersInput.newMembers.includes(member)) {
            console.log("Member already selected")
            return
        }
        if(addMembersInput.newMembers.length >= 8) {
            console.log("maximum number of chat members exceeded")
            return
        }
        setAddMembersInput((prevState) => ({
            ...prevState,
            newMembers: [...prevState.newMembers, member]
        }))
    }

    const handleRemoveMember = (member: string) => {
        const newProjectMembers = addMembersInput.newMembers.filter((user) => user !== member)
        setAddMembersInput((prevState) => ({
            ...prevState,
            newMembers: [...newProjectMembers]
        }))
    }

    // const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = event.target
    //     setAddMembersInput((prevState) => ({ ...prevState, [name]: value}))
    // }

    const handleAddMembersToProject = () => {

        addMembersToProject({ variables: {input: {newMembers: addMembersInput.newMembers, id: projectId}} })
        setAddMembersInput({
            newMembers: [],
        })
        handleClose()
    }

    const membersExist = (members: string[]) => {
        if(members.length > 0) {
            return true
        }
        return false
    }


    console.log(addMembersInput.newMembers)

    return (
        <div>
        <Button onClick={handleOpen} sx={{ margin: 3, color: "white", backgroundColor: "#676767", border: "1px solid black", borderRadius: "10px", '&:hover': { backgroundColor: "#a9f6ae", color: "black"} }}>Add Members to Project!</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <Grid sx={{ textAlign: "center", width: "100%", borderBottom: "1px solid black"}}>
                        <Typography id="modal-modal-title" variant="h4" sx={{ color: "white"}} >
                            Add New Members!
                        </Typography>
                    </Grid>
                    <SearchUsersCard handleAddMember={handleAddMember}/>
                    {membersExist(addMembersInput.newMembers) && <Typography variant="h6" sx={{ color: "white", borderBottom: "1px solid black"}}>Members</Typography>}
                    <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap"}}>
                        {addMembersInput.newMembers && addMembersInput.newMembers.map((member) => {
                            return (
                                <Grid onClick={() => handleRemoveMember(member)} sx={{ border: "0.5px solid black", borderRadius: "5%", padding: 1, margin: 1, backgroundColor: "#b5e2ff", '&:hover': { backgroundColor: "red"}}}>
                                    <Typography >{member}</Typography>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Divider />
                    <Grid sx={{display: "flex", justifyContent: "center", width: "100%", borderTop: "1px solid black"}}>
                        <Button sx={{ color: "black", backgroundColor: "#a9f6ae", border: "1px solid black", borderRadius: "10px", marginTop: "5%", '&:hover': { backgroundColor: "#86c48a"}}} onClick={handleAddMembersToProject}>Create Project</Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
        </div>
    );
}