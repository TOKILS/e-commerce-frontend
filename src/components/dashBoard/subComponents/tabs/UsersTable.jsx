// general
import { useState } from "react";

// components
import UpdateDialog from "./UpdateDialog";
import DeleteDialog from "./DeleteDialog";

// styled components
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function UsersTable(props) {
    // update dialog
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [updateDialogSelectedUserData, setUpdateDialogSelectedUserData] = useState({});

    const handleShowUpdate = () => {
        setShowUpdateDialog(true);
    };
    const handleCloseUpdate = () => {
        // setUpdateDialogSelectedUserData({});
        setShowUpdateDialog(false);
    };

    async function handleUpdateUser(user) {
        setUpdateDialogSelectedUserData(user);
        handleShowUpdate();
    }

    // delete dialog
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteDialogSelectedUser, setDeleteDialogSelectedUser] = useState({});

    const handleShowDelete = () => {
        setShowDeleteDialog(true);
    };
    const handleCloseDelete = () => {
        // setDeleteDialogSelectedUser({});
        setShowDeleteDialog(false);
    };

    async function handleDeleteUser(user) {
        let { username, token } = user;
        setDeleteDialogSelectedUser({ username, token });
        handleShowDelete();
    }

    return (
        <>
            <Table sx={{ minWidth: 650, marginTop: "2rem" }} aria-label="users table">
                <TableHead>
                    <TableRow>
                        <TableCell>User name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Role</TableCell>
                        <TableCell align="right">User since</TableCell>
                        <TableCell align="right">Update</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.users.map((user, idx) => {
                        return (
                            <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {user.username}
                                </TableCell>
                                <TableCell align="right" component="th" scope="row">
                                    {user.email}
                                </TableCell>
                                <TableCell align="right" component="th" scope="row">
                                    {user.role}
                                </TableCell>
                                <TableCell align="right" component="th" scope="row">
                                    {user.createdAt.substr(0, 10)}
                                </TableCell>
                                <TableCell align="right" component="th" scope="row">
                                    <LoadingButton onClick={() => handleUpdateUser(user)}>Update Info</LoadingButton>
                                </TableCell>
                                <TableCell align="right" component="th" scope="row">
                                    <LoadingButton onClick={() => handleDeleteUser(user)}>Delete</LoadingButton>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
                {/* <p key={idx}>
                                    {user.name} is a {user.role}
                                </p> */}
            </Table>
            <UpdateDialog user={updateDialogSelectedUserData} check={showUpdateDialog} handleClose={handleCloseUpdate} />
            <DeleteDialog user={deleteDialogSelectedUser} check={showDeleteDialog} handleClose={handleCloseDelete} />
        </>
    );
}
