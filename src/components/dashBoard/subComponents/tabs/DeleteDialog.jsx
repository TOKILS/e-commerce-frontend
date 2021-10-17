// general
import { useState } from "react";

// styled components
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// redux
import { connect } from "react-redux";
import { DeleteUser } from "../../../../store/dashboard/dashboard.store";

const DeleteDialog = ({ user, check, handleShow, handleClose, DeleteUser }) => {
    const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
    const deleteTheme = createTheme({
        palette: {
            primary: {
                main: "#f82d60",
            },
            secondary: {
                main: "#4e4e4e",
            },
        },
    });
    async function handleDeleteUser(token) {
        setDeleteBtnLoading(true);
        let errorCheck = await DeleteUser(token);
        console.log("~ delete error check", errorCheck);
        if (errorCheck?.error) {
            console.error("error updating user ", errorCheck.error.message);
        }
        setDeleteBtnLoading(false);
        handleClose();
    }
    return (
        <>
            <Dialog open={check} onClose={handleClose}>
                <DialogTitle>{`Are you sure you want to delete the user "${user.username}"?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: "#f82d60", fontWeight: "700" }}>This is irreversible</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" type="button" onClick={handleClose}>
                        Cancel
                    </Button>
                    <ThemeProvider theme={deleteTheme}>
                        <LoadingButton onClick={() => handleDeleteUser(user.token)} variant="outlined" loading={deleteBtnLoading} type="button">
                            DELETE
                        </LoadingButton>
                    </ThemeProvider>
                </DialogActions>
            </Dialog>
        </>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { DeleteUser };

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDialog);
