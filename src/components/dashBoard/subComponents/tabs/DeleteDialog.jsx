// general
import { useState, useEffect } from "react";

// styled components
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// redux
import { connect } from "react-redux";
import { DeleteUser } from "../../../../store/dashboard/dashboard.store";
import { handleSnackBar } from "../../../../store/snackbar/snackbar.store";

const DeleteDialog = ({ user, check, handleShow, handleClose, DeleteUser, handleSnackBar, snackbarState }) => {
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
        // console.log("~ errorCheck", errorCheck);
        if (errorCheck?.error) {
            console.error("error deleting user ", errorCheck.error.message);
            handleSnackBar({
                show: true,
                type: "error",
                text: errorCheck.error.message,
            });
        }
        if (errorCheck.successMsg) {
            // console.log("~ errorCheck.successMsg", errorCheck.successMsg);
            handleSnackBar({
                show: true,
                type: "warning",
                text: errorCheck.successMsg,
            });
        }
        setDeleteBtnLoading(false);
        handleClose();
    }
    useEffect(() => {
        // console.log("snackbarState updated > ", snackbarState);
    }, [snackbarState]);
    return (
        <>
            <Dialog open={check} onClose={handleClose}>
                <DialogTitle>{`Are you sure you want to delete the user "${user.username}"?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: "#f82d60", fontWeight: "700" }}>This is irreversible</DialogContentText>
                </DialogContent>
                <DialogActions  sx={{padding:"1rem"}}>
                    <Button color="secondary" type="button" onClick={handleClose}>
                        Cancel
                    </Button>
                    <ThemeProvider theme={deleteTheme}>
                        <LoadingButton onClick={() => handleDeleteUser(user.token)} variant="contained" loading={deleteBtnLoading} type="button">
                            DELETE
                        </LoadingButton>
                    </ThemeProvider>
                </DialogActions>
            </Dialog>
        </>
    );
};

const mapStateToProps = (state) => ({ snackbarState: state.snackbar });

const mapDispatchToProps = { DeleteUser, handleSnackBar };

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDialog);
