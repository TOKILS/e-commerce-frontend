// general
import { useState } from "react";
import * as React from "react";

// styled components
import { IconButton, Button, Typography, Card, CardActions, CardContent, CardMedia, Box, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

// redux
import { connect } from "react-redux";
import { handleSnackBar } from "../../../../store/snackbar/snackbar.store";
import { CancelOrder } from "../../../../store/dashboard-orders/dashboardOrders.store";

const OrderCard = ({ order, user, product, colorEle, size, CancelOrder, handleSnackBar }) => {
    // menu section
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // dialog section
    const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
    async function handleCancelOrder(token) {
        setDeleteBtnLoading(true);
        let errorCheck = await CancelOrder(token);
        // console.log("~ errorCheck", errorCheck);
        if (errorCheck?.error) {
            console.error("Error canceling order ", errorCheck.error.message);
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
        handleDeleteDialogClose();
    }
    const [showCancelOrderDialog, setShowCancelOrderDialog] = useState(false);
    function handleDeleteDialogOpen() {
        setShowCancelOrderDialog(true);
        handleMenuClose();
    }
    const handleDeleteDialogClose = () => {
        setShowCancelOrderDialog(false);
    };

    return (
        <>
            <Card tabIndex="0" key={order.id} sx={{ height: "12rem", backgroundColor: "rgb(241, 241, 241)", borderRadius: "1rem" }}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem", width:"100%", justifyContent:"space-between" }}>
                    <div>
                        <img style={{ width: "16rem", height: "12rem", objectFit: "cover" }} src={colorEle.image[0]?.Image ? colorEle.image[0]?.Image : "https://i.imgur.com/odGVdde.png"} alt="x" />
                    </div>
                    <CardContent sx={{flexGrow:"4"}}>
                        <div style={{ display: "flex", gap: "1rem", justifyContent: "space-between" }}>
                            <h2>
                                Order #{order.id} for user #{user.id} | {user.username}
                            </h2>
                            <IconButton id="basic-button" aria-controls="basic-menu" aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleMenuClick}>
                                <MoreVert />
                            </IconButton>
                        </div>
                        <Typography sx={{ display: "flex", justifyContent: "space-between", marginBottom: "0" }} gutterBottom variant="h5" component="div">
                            <span>{product.Name}</span>
                            <span style={{ position: "relative" }}>
                                <span style={{ fontSize: "14px", opacity: "0.6" }}>{order.Quantity}×</span>
                                <span style={{ textDecorationLine: Number.parseInt(product.Discount) > 0 ? "line-through" : "none" }}> ${product.Price}</span>
                                {Number.parseInt(product.Discount) > 0 ? <div style={{ fontSize: "14px", opacity: "0.6", position: "absolute", right: "0", top: "-1rem", fontSize: "12px", opacity: "0.6" }}>{product.Discount}</div> : ""}
                            </span>
                        </Typography>
                        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                            <span>Color</span>
                            <div style={{ backgroundColor: colorEle.Code, height: "1.2rem", width: "1.2rem", border: "x`white solid 2px", borderRadius: "50%", boxShadow: "0 1px 3px rgba(0,0,0,0.5)" }}></div>
                            <span>Size</span>
                            <span>{size.Size}</span>
                        </div>
                        <Typography variant="body2" color="text.secondary">
                            {product.Description}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
            <Menu
                sx={{ "& .MuiMenu-list": { backgroundColor: "rgb(241, 241, 241)" } }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleDeleteDialogClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem sx={{ backgroundColor: "rgb(241, 241, 241)" }} onClick={handleDeleteDialogOpen}>
                    Cancel order
                </MenuItem>
            </Menu>
            <Dialog open={showCancelOrderDialog} onClose={handleDeleteDialogClose}>
                <DialogTitle>{`Are you sure you want to cancel order #${order.id} for user #${user.id} | 4{user.username}?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: "#f82d60", fontWeight: "700" }}>This is irreversible</DialogContentText>
                </DialogContent>
                <DialogActions sx={{ padding: "1rem" }}>
                    <Button color="secondary" type="button" onClick={handleDeleteDialogClose}>
                        Cancel
                    </Button>
                    <LoadingButton color="error" onClick={() => handleCancelOrder(order.id)} variant="contained" loading={deleteBtnLoading} type="button">
                        DELETE
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

const mapStateToProps = (state) => ({ snackbarState: state.snackbar });

const mapDispatchToProps = { CancelOrder, handleSnackBar };

export default connect(mapStateToProps, mapDispatchToProps)(OrderCard);
