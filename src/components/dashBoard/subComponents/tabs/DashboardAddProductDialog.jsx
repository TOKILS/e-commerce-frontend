// general
import { useState } from "react";

// styled components
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Box, Select, InputLabel, MenuItem, InputAdornment, Divider } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Add } from "@material-ui/icons";

// redux
import { connect } from "react-redux";
import { addProductToBackend } from "../../../../store/dashboard-products/dashboardProducts.store";
import { handleSnackBar } from "../../../../store/snackbar/snackbar.store";

const DashboardAddProductDialog = ({ user, check, handleShow, type, handleClose, updateUser, handleSnackBar, reduxTypes, addProductToBackend }) => {
    const [submitBtnLoading, setSubmitBtnLoading] = useState(false);

    // textFields error checks
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
    const [imageCheck, setImageCheck] = useState({
        error: false,
        message: "",
    });
    // size
    const [selectedSize, setSelectedSize] = useState(3);
    function handleSelectedSize(e) {
        setSelectedSize(e.target.value);
    }
    let sizeArr = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

    // colors section
    const [selectedColor, setSelectedColor] = useState(0);
    function handleSelectedColor(e) {
        setSelectedColor(e.target.value);
    }
    function colorLink(code) {
        let neC = code;
        let codeNoS = neC.substring(1);
        return `https://www.colorhexa.com/${codeNoS}.png`;
    }
    const [currentImageLink, setCurrentImageLink] = useState("");
    function handleImageLinkChange(e) {
        setCurrentImageLink(e.target.value);
    }
    let colorsArr = [
        { name: "Teal", code: "#1FDEB1" },
        { name: "White", code: "#f2f6f7" },
        { name: "Black", code: "#191919" },
        { name: "Cherry Mahogany", code: "#8e3b33" },
        { name: "Red", code: "#ff1e4b" },
        { name: "Pink", code: "#ff6bb2" },
        { name: "Hot Pink", code: "#ff12a8" },
        { name: "Fawn", code: "#f9ca77" },
        { name: "Cognac", code: "#ff7d32" },
        { name: "Spruce", code: "#5f6b4f" },
        { name: "Slate", code: "#7f746b" },
        {name: "Grey", code: "#767676"}
    ];

    async function handleUpdateSubmit(e) {
        e.preventDefault();
        setSubmitBtnLoading(true);

        let errPass = true;

        let productName = e.target.name.value;
        let price = e.target.price.value;
        let description = e.target.description.value;
        let quantity = e.target.quantity.value;
        let discount = e.target.discount.value;
        let parentType = type.id;
        let productObj = {
            TypeID: parentType,
            Name: productName,
            Description: description,
            Price: price,
            Quantity: quantity,
            Discount: discount,
        };

        let chosenColorObj = colorsArr[selectedColor];
        let colorName = chosenColorObj.name;
        let colorHexCode = chosenColorObj.code;
        let colorHexImageLink = colorLink(colorHexCode);
        let colorObj = {
            Name: colorName,
            Code: colorHexCode,
            Image: colorHexImageLink,
        };

        let chosenSize = sizeArr[selectedSize];
        console.log("~ chosenSize", chosenSize);

        let sizeObj = {
            Size: chosenSize,
        };

        let imgLink = currentImageLink;
        let imageObj = {
            Image: imgLink,
        };
        // error checking code block
        {
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
            } else {
                setQuantityCheck({ error: false, message: "" });
            }
            // if (discount === "") {
            //     setDiscountCheck({ error: true, message: "Can't be empty" });
            //     errPass = false;
            // } else
            if (!/^[0-9]*$/.test(discount)) {
                setDiscountCheck({ error: true, message: "Accepts numbers only" });
                errPass = false;
            } else {
                setDiscountCheck({ error: false, message: "" });
            }

            if (imgLink === "") {
                setImageCheck({ error: true, message: "Can't be empty" });
                errPass = false;
            } else {
                setImageCheck({ error: false, message: "" });
            }
        }

        console.log("errPass ", errPass);
        if (errPass === true) {
            let errorCheck = await addProductToBackend(productObj, colorObj, sizeObj, imageObj);
            if (errorCheck?.error) {
                console.error("error updating user ", errorCheck.error.message);
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
        } else {
            setSubmitBtnLoading(false);
        }
    }

    return (
        <Dialog sx={{ "& .MuiDialog-paper": { maxWidth: "900px" } }} open={check} onClose={handleClose}>
            <DialogTitle>{`Create product in ${type.Name}`}</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 0.05fr 1fr",
                        gap: "1rem",
                        width: "100%",
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleUpdateSubmit}
                    id="updateForm"
                >
                    {/* left grid section */}
                    <div
                        sx={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            gap: "5rem",
                        }}
                    >
                        {/* product section */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                                width: "100%",
                            }}
                        >
                            <h3>Product info</h3>
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
                            <Select value={selectedSize} onChange={handleSelectedSize}>
                                {sizeArr.map((size, idx) => {
                                    return <MenuItem value={idx}>{size}</MenuItem>;
                                })}
                            </Select>
                        </div>
                    </div>
                    {/* middle vertical divider div */}
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Divider orientation="vertical" />
                    </div>
                    {/* right grid section */}
                    <div
                        sx={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            width: "100%",
                        }}
                    >
                        {/* product section */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                                width: "100%",
                            }}
                        >
                            <h3>Color info</h3>
                            <Select value={selectedColor} onChange={handleSelectedColor}>
                                {colorsArr.map((colorObj, idx) => {
                                    return (
                                        <MenuItem value={idx}>
                                            <div style={{ display: "flex", flexDirection: "row!important", gap: "1rem", alignItems: "center" }}>
                                                <div style={{ backgroundColor: colorObj.code, width: "1rem", height: "1rem", borderRadius: "50%" }}></div>
                                                {colorObj.name}
                                            </div>
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <TextField error={imageCheck.error} helperText={imageCheck.message ? imageCheck.message : "Make sure the image loads without any problems"} name="image" label="Image link" variant="outlined" onChange={handleImageLinkChange} />
                            <img
                                src={currentImageLink}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://i.imgur.com/odGVdde.png";
                                }}
                                alt="product image"
                                style={{ objectFit: "cover", height: "16rem", width: "100%" }}
                            />
                        </div>
                    </div>
                </Box>
            </DialogContent>
            <DialogActions sx={{ margin: "1rem" }}>
                <Button color="secondary" type="button" onClick={handleClose}>
                    Cancel
                </Button>
                <LoadingButton variant="contained" loading={submitBtnLoading} form="updateForm" type="submit">
                    Create product
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = (state) => ({
    reduxTypes: state.dashboardProducts.types,
});

const mapDispatchToProps = { addProductToBackend, handleSnackBar };

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAddProductDialog);
