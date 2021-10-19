// general
import { useState } from "react";

// styled components
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Box, Select, MenuItem, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// redux
import { connect } from "react-redux";
import { updateUser } from "../../../../store/dashboard/dashboard.store";
import { handleSnackBar } from "../../../../store/snackbar/snackbar.store";

const DashboardAddProductDialog = ({ user, check, handleShow, type, handleClose, updateUser, handleSnackBar, reduxTypes }) => {
    const [submitBtnLoading, setSubmitBtnLoading] = useState(false);

    const [nameCheck, setNameCheck] = useState({
        error: false,
        message: "",
    });
    const [priceCheck, setPriceCheck] = useState({
        error: false,
        message: "",
    });
    const [descriptionCheck, setDescriptionCheck] = useState({
        error: false,
        message: "",
    });
    const [quantityCheck, setQuantityCheck] = useState({
        error: false,
        message: "",
    });
    const [discountCheck, setDiscountCheck] = useState({
        error: false,
        message: "",
    });

    // const [selectedType, setSelectedType] = useState(0);
    // function handleTypeChange(e) {
    //     setSelectedType(e.target.value);
    // }
    // function handleSpecificTypeChange(num) {
    //     setSelectedType(num);
    // }

    async function handleUpdateSubmit(e) {
        e.preventDefault();
        setSubmitBtnLoading(true);

        let productName = e.target.name.value;
        let price = e.target.price.value;
        let description = e.target.description.value;
        let quantity = e.target.quantity.value;
        let discount = e.target.discount.value;

        let errPass = true;

        if (productName === "") {
            setNameCheck({ error: true, message: "Can't be empty" });
            errPass = false;
        } else {
            setNameCheck({ error: false, message: "" });
        }
        
        if (price === "") {
            setPriceCheck({ error: true, message: "Can't be empty" });
            errPass = false;
        } else if (!/^[0-9]+$/.test(price)) {
            setPriceCheck({ error: true, message: "Accepts numbers only" });
            errPass = false;
        } else {
            setPriceCheck({ error: false, message: "" });
        }

        if (description === "") {
            setDescriptionCheck({ error: true, message: "Can't be empty" });
            errPass = false;
        } else {
            setDescriptionCheck({ error: false, message: "" });
        }

        if (quantity === "") {
            setQuantityCheck({ error: true, message: "Can't be empty" });
            errPass = false;
        } else if (!/^[0-9]+$/.test(quantity)) {
            setQuantityCheck({ error: true, message: "Accepts numbers only" });
            errPass = false;
        }else {
            setQuantityCheck({ error: false, message: "" });
        }

        if (discount === "") {
            setDiscountCheck({ error: true, message: "Can't be empty" });
            errPass = false;
        } else if (!/^[0-9]+$/.test(discount)) {
            setDiscountCheck({ error: true, message: "Accepts numbers only" });
            errPass = false;
        } else {
            setDiscountCheck({ error: false, message: "" });
        }

        console.log("productName, price, description, quantity, discount ", "\n", productName, price, description, quantity, discount);

        if (errPass === true) {
            // if (errorCheck?.error) {
            //     console.error("error updating user ", errorCheck.error.message);
            //     handleSnackBar({
            //         show: true,
            //         type: "error",
            //         text: errorCheck.error.message,
            //     });
            // } else if (errorCheck.successMsg) {
            //     handleSnackBar({
            //         show: true,
            //         type: "success",
            //         text: errorCheck.successMsg,
            //     });
            // }
            setSubmitBtnLoading(false);
            // handleClose();
        } else {
            setSubmitBtnLoading(false);
        }
    }

    return (
        <Dialog open={check} onClose={handleClose}>
            <DialogTitle>{`Create product in ${type.Name}`}</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    sx={{
                        marginTop: "1rem",
                        marginBottom: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        width: "100%",
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleUpdateSubmit}
                    id="updateForm"
                >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <TextField error={nameCheck.error} helperText={nameCheck.message} name="name" label="Product Name" variant="outlined" />

                        <TextField
                            error={priceCheck.error}
                            helperText={priceCheck.message}
                            name="price"
                            label="Price"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                    </div>
                    <TextField error={descriptionCheck.error} helperText={descriptionCheck.message} multiline fullWidth name="description" label="Description" variant="outlined" />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <TextField error={quantityCheck.error} helperText={quantityCheck.message} name="quantity" label="Quantity" variant="outlined" />
                        <TextField error={discountCheck.error} helperText={discountCheck.message} name="discount" label="Discount" variant="outlined" />
                    </div>

                    <TextField sx={{ display: "none" }} name="type" label="Type" variant="outlined" defaultValue={type.id} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" type="button" onClick={handleClose}>
                    Cancel
                </Button>
                <LoadingButton loading={submitBtnLoading} form="updateForm" type="submit" autoFocus>
                    Create product
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = (state) => ({
    reduxTypes: state.dashboardProducts.types,
});

const mapDispatchToProps = { handleSnackBar };

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAddProductDialog);
