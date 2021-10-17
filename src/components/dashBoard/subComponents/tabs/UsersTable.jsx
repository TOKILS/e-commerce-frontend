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
        setUpdateDialogSelectedUserData({});
        setShowUpdateDialog(false);
    };

    const [usersUpdateLoading, setUsersUpdateLoading] = useState({});
    async function handleUpdateUser(user) {
        setUpdateDialogSelectedUserData(user);
        handleShowUpdate();

        // TODO: move the loading animation to the dialog
        await setUsersUpdateLoading({ ...usersUpdateLoading, [user]: true });
        await setTimeout(() => {
            setUsersUpdateLoading({ ...usersUpdateLoading, [user]: false });
        }, 1000);
    }

    // delete dialog
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteDialogSelectedUser, setDeleteDialogSelectedUser] = useState({});

    const handleShowDelete = () => {
        setShowDeleteDialog(true);
    };
    const handleCloseDelete = () => {
        setDeleteDialogSelectedUser({});
        setShowDeleteDialog(false);
    };

    const [usersDeleteLoading, setUsersDeleteLoading] = useState({});
    async function handleDeleteUser(userToken, username) {
        setDeleteDialogSelectedUser({ username, userToken });
        handleShowDelete();

        // TODO: move the loading animation to the dialog
        await setUsersDeleteLoading({ ...usersDeleteLoading, [userToken]: true });
        await setTimeout(() => {
            setUsersDeleteLoading({ ...usersDeleteLoading, [userToken]: false });
        }, 1000);
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
                                    <LoadingButton onClick={() => handleUpdateUser(user)} loading={usersUpdateLoading[user.name]}>
                                        Update Info
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right" component="th" scope="row">
                                    <LoadingButton onClick={() => handleDeleteUser(user.token)} loading={usersDeleteLoading[user.name]}>
                                        Delete
                                    </LoadingButton>
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
