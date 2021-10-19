// general
import { useEffect, useState } from "react";

// components
import UsersTable from "./UsersTable";
import SignUpUserDialog from "./SignUpUserDialog";

// styled components
import { Snackbar, MuiAlert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Cached, Add } from "@mui/icons-material";

// redux
import { connect } from "react-redux";
import { getUsers } from "../../../../store/dashboard/dashboard.store";
import { handleSnackBar } from "../../../../store/snackbar/snackbar.store";

const Users = (props) => {
    // refreshing users list
    useEffect(() => {
        handleGettingUsers();
    }, []);

    const [gettingUsersLoading, setGettingUsersLoading] = useState(false);

    async function handleGettingUsers(e) {
        setGettingUsersLoading(true);
        let errorCheck = await props.getUsers();
        if (errorCheck?.error) {
            console.error("error updating user ", errorCheck.error.message);
            props.handleSnackBar({
                show: true,
                type: "error",
                text: errorCheck.error.message,
            });
        } else if (errorCheck.successMsg) {
            props.handleSnackBar({
                show: true,
                type: "info",
                text: errorCheck.successMsg,
            });
        }
        setGettingUsersLoading(false);
    }

    // adding user
    const [showSignUpDialog, setShowSignUpDialog] = useState(false);

    const handleShowSignUpDialog = () => {
        setShowSignUpDialog(true);
    };
    const handleCloseSignUpDialog = () => {
        setShowSignUpDialog(false);
    };
    return (
        <>
            <div tabIndex="0" className={props.users.length === 0 ? "allUsers dashboardUsersEmpty" : "allUsers"}>
                <div className="Btns">
                    {props.users.length > 0 ? (
                        <LoadingButton onClick={handleShowSignUpDialog} variant="text" startIcon={<Add />} className="addUsersUsersBtn">
                            Add User
                        </LoadingButton>
                    ) : (
                        ""
                    )}
                    <LoadingButton variant="text" loading={gettingUsersLoading} className="refreshUsersBtn">
                        <Cached />
                    </LoadingButton>
                </div>
                {props.users.length > 0 ? (
                    <>
                        <UsersTable users={props.users} />
                    </>
                ) : (
                    <div className="dashboardUsersEmpty_text">
                        <div className="dashboardUsersEmpty_arrow">➜</div>
                        <h2>No users</h2>
                        <p>Please refresh the users list</p>
                    </div>
                )}
                <SignUpUserDialog check={showSignUpDialog} handleClose={handleCloseSignUpDialog} />
            </div>
        </>
    );
};
const mapStateToProps = (state) => ({
    users: state.dashboard.users,
});

const mapDispatchToProps = { getUsers, handleSnackBar };

export default connect(mapStateToProps, mapDispatchToProps)(Users);
