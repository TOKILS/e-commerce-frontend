// general
import { useState } from "react";

// styled components
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// redux
import { connect } from "react-redux";
import { updateUser } from "../../../../store/dashboard/dashboard.store";

const UpdateDialog = ({ user, check, handleShow, handleClose }) => {
    const [submitBtnLoading, setSubmitBtnLoading] = useState(false);

    async function handleUpdateSubmit(e) {
        e.preventDefault();
        setSubmitBtnLoading(true);
        let userName = e.target.userName.value;
        let firstName = e.target.firstName.value;
        let lastName = e.target.lastName.value;
        let email = e.target.email.value;
        let role = e.target.role.value;
        let token = e.target.token.value;

        updateUser({
            userName,
            firstName,
            lastName,
            email,
            role,
            token,
        });
        setSubmitBtnLoading(false);
        handleClose();
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
                    <TextField name="role" label="Role" variant="outlined" defaultValue={user.role} />
                    <TextField sx={{ display: "none" }} name="token" label="Token" variant="outlined" defaultValue={user.token} />
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

// const mapStateToProps = (state) => ({
//   users: state.dashboard.users,
// });

const mapDispatchToProps = { updateUser };

export default connect(mapDispatchToProps)(UpdateDialog);
