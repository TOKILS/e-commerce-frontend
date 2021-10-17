// general
import { connect } from "react-redux";
import faker from "faker";

// styled components
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { PeopleAltOutlined, Cached } from "@mui/icons-material";

// redux
import { getUsers } from "../../../../store/dashboard/dashboard.store";
import { useState } from "react";

const Users = (props) => {
    const [gettingUsersLoading, setGettingUsersLoading] = useState(false);
    const [usersUpdateLoading, setUsersUpdateLoading] = useState({});
    const [usersDeleteLoading, setUsersDeleteLoading] = useState({});

    async function handleUpdateUser(user) {
        // console.log(`Update ran `, user);
        await setUsersUpdateLoading({ ...usersUpdateLoading, [user]: true });
        await setTimeout(() => {
            setUsersUpdateLoading({ ...usersUpdateLoading, [user]: false });
        }, 1000);
        console.log(usersUpdateLoading);
    }
    async function handleDeleteUser(user) {
        // console.log(`Delete ran `, user);
        await setUsersDeleteLoading({ ...usersDeleteLoading, [user]: true });
        await setTimeout(() => {
            setUsersDeleteLoading({ ...usersDeleteLoading,  [user]: false });
        }, 1000);
        console.log(usersDeleteLoading);
    }
    async function handleGettingUsers(e) {
        setGettingUsersLoading(true);
        await props.getUsers();
        setGettingUsersLoading(false);
    }
    return (
        <>
            <div className={props.users.length === 0 ? "allUsers dashboardUsersEmpty" : "allUsers"}>
                <LoadingButton variant="text" loading={gettingUsersLoading} className="refreshUsersBtn" onClick={handleGettingUsers}>
                    <Cached />
                </LoadingButton>
                {props.users.length > 0 ? (
                    <Table sx={{ minWidth: 650, marginTop: "2rem" }} aria-label="users table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>User name</TableCell>
                                <TableCell align="right">Role</TableCell>
                                <TableCell align="right">User since</TableCell>
                                <TableCell align="right">Update</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.users.map((user, idx) => {
                                return (
                                    <TableRow key={user.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {idx + 1}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {user.name}
                                        </TableCell>
                                        <TableCell align="right" component="th" scope="row">
                                            {user.role}
                                        </TableCell>
                                        <TableCell align="right" component="th" scope="row">
                                            {faker.date.past().toDateString()}
                                        </TableCell>
                                        <TableCell align="right" component="th" scope="row">
                                            <LoadingButton onClick={() => handleUpdateUser(user.name)} loading={usersUpdateLoading[user.name]}>
                                                Update
                                            </LoadingButton>
                                        </TableCell>
                                        <TableCell align="right" component="th" scope="row">
                                            <LoadingButton onClick={() => handleDeleteUser(user.name)} loading={usersDeleteLoading[user.name]}>
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
                ) : (
                    <div className="dashboardUsersEmpty_text">
                        <div className="dashboardUsersEmpty_arrow">➜</div>
                        <h2>No users</h2>
                        <p>Please refresh the users list</p>
                    </div>
                )}
            </div>
        </>
    );
};
const mapStateToProps = (state) => ({
    users: state.dashboard.users,
});

const mapDispatchToProps = { getUsers };

export default connect(mapStateToProps, mapDispatchToProps)(Users);
