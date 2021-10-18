// general
import { useState } from "react";

// styled components
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Select, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// redux
import { connect } from "react-redux";
import { signUpUser } from "../../../../store/dashboard/dashboard.store";
import { handleSnackBar } from "../../../../store/snackbar/snackbar.store";

// TODO: >>>>>5 Refactor this update dialog to be an addUser dialog <<<<<
const SignUpUserDialog = ({ user, check, handleShow, handleClose, updateUser,handleSnackBar }) => {
    const [submitBtnLoading, setSubmitBtnLoading] = useState(false);
    const [selectedRole, setSelectedRoleRole] = useState("user");

    async function handleAddSubmit(e) {
        e.preventDefault();
        console.log("handleUpdateSubmit ran");

        setSubmitBtnLoading(true);
        let username = e.target.userName.value;
        let firstname = e.target.firstName.value;
        let lastname = e.target.lastName.value;
        let password = e.target.password.value;
        let email = e.target.email.value;
        let role = selectedRole;

        let errorCheck = await signUpUser({
            username: username,
            firstname: firstname,
            lastname: lastname,
            password: password,
            email: email,
            role: role,
        });
        if (errorCheck?.error) {
            console.error("error signing up user ", errorCheck.error.message);
            handleSnackBar({
                show: true,
                type: "error",
                text: errorCheck.error.message,
            });
        } else if (errorCheck.successMsg) {
            handleSnackBar({
                show: true,
                type: "success",
                text: errorCheck.successMsg,
            });
        }
        setSubmitBtnLoading(false);
        handleClose();
    }
    function handleRoleChange(e) {
        setSelectedRoleRole(e.target.value);
    }
    return (
        <Dialog open={check} onClose={handleClose}>
            <DialogTitle>{`Sign up user`}</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ m: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", width: "96%" }} noValidate autoComplete="off" onSubmit={handleAddSubmit} id="addUser">
                    <TextField name="userName" label="User name" variant="outlined" />
                    <TextField name="email" label="Email" variant="outlined" />
                    <TextField name="firstName" label="First name" variant="outlined" />
                    <TextField name="lastName" label="Last name" variant="outlined" />
                    <TextField type="password" name="password" label="Password" variant="outlined" />
                    <Select name="role" value="user" onChange={handleRoleChange}>
                        <MenuItem value={"user"}>User</MenuItem>
                        <MenuItem value={"vendor"}>Vendor</MenuItem>
                        <MenuItem value={"admin"}>Admin</MenuItem>
                    </Select>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" type="button" onClick={handleClose}>
                    Cancel
                </Button>
                <LoadingButton loading={submitBtnLoading} form="addUserForm" type="submit" autoFocus>
                    Add User
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { signUpUser, handleSnackBar };

export default connect(mapStateToProps, mapDispatchToProps)(SignUpUserDialog);
