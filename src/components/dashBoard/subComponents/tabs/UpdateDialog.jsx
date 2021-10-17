// general
import { useState } from "react";

// styled components
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Box, Select, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// redux
import { connect } from "react-redux";
import { updateUser } from "../../../../store/dashboard/dashboard.store";

const UpdateDialog = ({ user, check, handleShow, handleClose, updateUser }) => {
    const [submitBtnLoading, setSubmitBtnLoading] = useState(false);
    const [selectedRole, setSelectedRoleRole] = useState("user");

    async function handleUpdateSubmit(e) {
        e.preventDefault();
        console.log("handleUpdateSubmit ran");

        setSubmitBtnLoading(true);
        let userName = e.target.userName.value;
        let firstName = e.target.firstName.value;
        let lastName = e.target.lastName.value;
        let email = e.target.email.value;
        let role = selectedRole;

        let token = e.target.token.value;

        let errorCheck = await updateUser({
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role,
            token: token,
        });
        console.log("~ update error check", errorCheck);
        if (errorCheck?.error) {
            console.error("error updating user ", errorCheck.error.message);
        }
        setSubmitBtnLoading(false);
        handleClose();
    }
    function handleRoleChange(e) {
        setSelectedRoleRole(e.target.value);
    }
    return (
        <Dialog open={check} onClose={handleClose}>
            <DialogTitle>{`Update ${user.username}'s info`}</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ m: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", width: "96%" }} noValidate autoComplete="off" onSubmit={handleUpdateSubmit} id="updateForm">
                    <TextField name="userName" label="User name" variant="outlined" defaultValue={user.username} />
                    <TextField name="firstName" label="First name" variant="outlined" defaultValue={user.firstname} />
                    <TextField name="lastName" label="Last name" variant="outlined" defaultValue={user.lastname} />
                    <TextField name="email" label="Email" variant="outlined" defaultValue={user.email} />

                    <Select name="role" value={user.role} onChange={handleRoleChange}>
                        <MenuItem value={"user"}>User</MenuItem>
                        <MenuItem value={"vendor"}>Vendor</MenuItem>
                        <MenuItem value={"admin"}>Admin</MenuItem>
                    </Select>

                    <TextField sx={{ display: "none" }}  name="token" label="Token" variant="outlined" defaultValue={user.token} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" type="button" onClick={handleClose}>
                    Cancel
                </Button>
                <LoadingButton loading={submitBtnLoading} form="updateForm" type="submit" autoFocus>
                    Update
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { updateUser };

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDialog);
