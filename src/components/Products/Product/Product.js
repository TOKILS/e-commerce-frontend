import React, { useState } from "react";
import {
    Grid,
    Button,
    Divider,
    Paper,
    Chip,
    IconButton,
} from "@material-ui/core";

import Reviews from "../../Reviews/Reviews";
import allActions from "../../../stores/cart/actions/all_actions";
import { useDispatch, useSelector } from "react-redux";

import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";

import {
    DeliveryIcon,
    SupportIcon,
    CheckIcon,
} from "../../SvgIcons/IconsMaterial";

import Typography from "@material-ui/core/Typography";
import useStyles from "./styles.js";
import { addOneItemToCart, handleItemToCart } from "../../../controllers/cart";

const Product = ({ product, reviews }) => {
    const classes = useStyles();
    const [image, setImage] = useState(product.images[0]);
    const { name, description, price, stock, images, categories } = product;

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart_store);
    const products = useSelector((state) => state.cart_store.products);
    const user = useSelector((state) => state.user_store.user);

    const [open, setOpen] = useState(false);
    const [sign, setSign] = useState(false);
    const [outOfStock, setOutOfStock] = useState(false);

    const handleClose = (reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleCloseStock = (reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOutOfStock(false);
    };

    const handleCloseGuest = (reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSign(false);
    };

    const handleImage = (event) => {
        setImage(images[event.target.getAttribute("data-index")]);
    };

    const handleAddToCart = () => {
        if (user.hasOwnProperty("role")) {
            const isInCart = products.filter((p) => p.id === product.id);
            if (isInCart.length === 1) {
                addOneItemToCart(cart.id, product.id)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => console.log(err));
            } else {
                handleItemToCart(cart.id, product.id, 1)
                    .then((response) => {
                        if (response.msg === "Product has no more stock available") {
                            console.log(response);
                            setOutOfStock(true);
                        } else {
                            console.log(response);
                        }
                        dispatch(allActions.getCart(user.id));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        } else {
            dispatch(allActions.postCartGuest(product))
        }
    };

    const showImages = () => {
        console.log(product)
    }
    showImages()

    const ContentTop = (
        <Grid item container xs={12}>
            <Grid item container xs={8} className={classes.bodyTopLeft}>
                <Grid
                    item
                    container
                    direction="row"
                    spacing={1}
                    style={{ margin: "auto" }}
                >
                    <Grid item container spacing={2}>
                        <Grid item container xs={2} justify="space-between">
                            {images.map((image, index) => (
                                <Grid
                                    item
                                    container
                                    justify="center"
                                    alignItems="flex-start"
                                    key={index}
                                    className={classes.gridImage}
                                >
                                    <Grid item>
                                        <img
                                            src={image}
                                            onClick={handleImage}
                                            data-index={index}
                                            className={classes.previewImage}
                                            alt="Notimage"
                                        />
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid
                            item
                            container
                            xs={10}
                            justify="center"
                            style={{ margin: "auto" }}
                        >
                            <Grid item>
                                <img src={image} className={classes.mainImage} alt="Notimage" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid
                item
                container
                xs={4}
                justify="space-between"
                className={classes.bodyTopRight}
            >
                <Grid
                    item
                    container
                    direction="column"
                    spacing={1}
                    style={{ margin: "auto" }}
                >
                    <Grid item>
                        <Typography variant="h6">{name}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.detailsPrice} variant="h4">
                            {parseFloat(price).toFixed(2)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            {reviews
                                ? `${reviews.length} Reviews`
                                : "Dont have any reviews yet"}
                        </Typography>
                    </Grid>
                    <Grid item>
                        {stock ? (
                            <Typography variant="subtitle1">Stock: {product.stock}</Typography>
                        ) : (
                            <Typography variant="subtitle1">Out of stock</Typography>
                        )}
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" color="textSecondary">
                            {description.substring(0, 200) + "..."}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    spacing={1}
                    style={{ margin: "auto" }}
                >
                    <Grid item container spacing={1}>
                        <Grid item>
                            <DeliveryIcon />
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">Free Shipping</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={1}>
                        <Grid item>
                            <SupportIcon />
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">Quality Support</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={1}>
                        <Grid item>
                            <CheckIcon />
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">Original Products</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    spacing={1}
                    style={{ margin: "auto" }}
                >
                    <Grid item>
                        <Button
                            onClick={handleAddToCart}
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                        >
                            ADD TO CART
                        </Button>
                    </Grid>
                    <Snackbar
                        color="secondary"
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        message="The product was already added to your cart!"
                        action={
                            <>
                                <IconButton
                                    size="small"
                                    aria-label="close"
                                    onClick={handleClose}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </>
                        }
                    />
                    <Snackbar
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        open={sign}
                        autoHideDuration={3000}
                        onClose={handleCloseGuest}
                    >
                        <MuiAlert
                            severity="error"
                            onClose={handleCloseGuest}
                            variant="filled"
                        >
                            You need to sign in to add products
                        </MuiAlert>
                    </Snackbar>

                    <Snackbar
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        open={outOfStock}
                        autoHideDuration={3000}
                        onClose={handleCloseGuest}
                    >
                        <MuiAlert
                            severity="error"
                            onClose={handleCloseStock}
                            variant="filled"
                        >
                            Product is out of stock
                        </MuiAlert>
                    </Snackbar>
                </Grid>
            </Grid>
        </Grid>
    );

    const ContentDown = (
        <Grid item container xs={12}>
            <Grid
                item
                container
                xs={8}
                justify="flex-start"
                className={classes.bodyDownLeft}
            >
                <Grid item container direction="column" spacing={1}>
                    <Grid item>
                        <Typography variant="h6">Description</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" color="textSecondary">
                            {description}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ padding: "16px 0px" }}>
                    <Divider />
                </Grid>
                <Reviews productId={product.id} reviews={reviews} />
            </Grid>

            <Grid
                container
                xs={4}
                className={classes.bodyDownRight}
            >
                <Grid container className={classes.containerButtomLeft}>
                    <Typography variant="h6" className={classes.categoriesTitle}>Categories</Typography>
                    {categories.map((category, index) => (
                        <Chip
                            key={index}
                            size="medium"
                            variant="default"
                            label={category.name}
                            color="default"
                        />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );

    return (
        <Grid container direction="column">
            <Grid item container>
                <Grid item xs={false} sm={1} xl={2} />
                <Grid
                    item
                    container
                    xs={12}
                    sm={10}
                    xl={8}
                    className={classes.bodyMargin}
                >
                    <Paper className={classes.body}>
                        {ContentTop}
                        {ContentDown}
                    </Paper>
                </Grid>
                <Grid item xs={false} sm={1} xl={2} />
            </Grid>
        </Grid>
    );
};

export default Product;