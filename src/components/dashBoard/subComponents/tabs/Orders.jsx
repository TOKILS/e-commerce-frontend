// general
import { useEffect, useState } from "react";

// styledComponents
import { IconButton, Button, Typography, Card, CardActions, CardContent, CardMedia, Box, Menu,MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Cached,MoreVert } from "@mui/icons-material";

// components
import OrderCard from "./OrderCard";

// redux
import { connect } from "react-redux";
import { getUsers } from "../../../../store/dashboard/dashboard.store";
import { handleSnackBar } from "../../../../store/snackbar/snackbar.store";
import { refreshProducts } from "../../../../store/dashboard-products/dashboardProducts.store";
import { refreshOrders, refreshColors, refreshSizes } from "../../../../store/dashboard-orders/dashboardOrders.store";
const Orders = (props) => {
    // refreshing orders list
    useEffect(() => {
        handleRefreshOrders();
    }, []);
    const [updateOrdersListLoading, setUpdateOrdersListLoading] = useState(false);
    const [refreshErrPass, setRefreshErrPass] = useState(true);

    async function handleRefreshOrders() {
        setUpdateOrdersListLoading(true);
        setRefreshErrPass(true);
        await handleRefreshAll();
        if (refreshErrPass) {
            props.handleSnackBar({
                show: true,
                type: "info",
                text: "Orders list updated",
            });
            setUpdateOrdersListLoading(false);
        } else {
            props.handleSnackBar({
                show: true,
                type: "error",
                text: "Error refreshing orders list",
            });
            setUpdateOrdersListLoading(false);
        }
        setUpdateOrdersListLoading(false);
    }
    async function handleRefreshAll() {
        await handleUsersRefresh();
        await handleProductsRefresh();
        await handleOrdersRefresh();
        // await handleColorsRefresh();
        await handleSizesRefresh();
    }
    async function handleUsersRefresh() {
        let errorCheck = await props.getUsers();
        if (errorCheck?.error) {
            console.error("error updating users info", errorCheck.error.message);
            props.handleSnackBar({
                show: true,
                type: "error",
                text: errorCheck.error.message,
            });
            setRefreshErrPass(false);
        }
    }

    // products section
    async function handleProductsRefresh() {
        let errorCheck = await props.refreshProducts();
        if (errorCheck?.error) {
            console.error("Error refreshing products info", errorCheck.error.message);
            props.handleSnackBar({
                show: true,
                type: "error",
                text: errorCheck.error.message,
            });
            setRefreshErrPass(false);
        }
    }
    async function handleOrdersRefresh() {
        let errorCheck = await props.refreshOrders();
        if (errorCheck?.error) {
            console.error("Error refreshing orders info", errorCheck.error.message);
            props.handleSnackBar({
                show: true,
                type: "error",
                text: errorCheck.error.message,
            });
            setRefreshErrPass(false);
        }
    }
    async function handleColorsRefresh() {
        let errorCheck = await props.refreshColors();
        if (errorCheck?.error) {
            console.error("Error refreshing colors info", errorCheck.error.message);
            props.handleSnackBar({
                show: true,
                type: "error",
                text: errorCheck.error.message,
            });
            setRefreshErrPass(false);
        }
    }
    async function handleSizesRefresh() {
        let errorCheck = await props.refreshSizes();
        if (errorCheck?.error) {
            console.error("Error refreshing sizes info", errorCheck.error.message);
            props.handleSnackBar({
                show: true,
                type: "error",
                text: errorCheck.error.message,
            });
            setRefreshErrPass(false);
        }
    }
    return (
        <div className="dashboard_ordersTab">
            <div className="Btns">
                <LoadingButton onClick={handleRefreshOrders} variant="text" loading={updateOrdersListLoading} className="refreshUsersBtn">
                    <Cached />
                </LoadingButton>
            </div>
            <div className="ordersContainerDiv" style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop:"3rem" }}>
                {props.orders.map((order, orderIdx) => {
                    return props.users.map((user, userIdx) => {
                        // console.log(user);
                        // console.log(`~ user.id ${user.id} === order.UserID ${order.UserID} =`, user.id === order.UserID);
                        if (user.id === order.UserID) {
                            // console.log("~ user.id === order.UserID", user.id === order.UserID);
                            return props.products.map((product, productIdx) => {
                                // if (product.id === order.ProductID) console.log("~ product.id === order.ProductID", product.id === order.ProductID);
                                // console.log(`product > `, product);
                                return product.color.map((colorEle, colorIdx) => {
                                    // console.log(`~ colorEle.id ${product.color.id} === order.ColorID ${order.ColorID} =`, colorEle.id === order.ColorID);
                                    if (colorEle.id === order.ColorID) {
                                        // console.log("~ colorEle.id === order.ColorID", colorEle.id === order.ColorID);
                                        return props.sizes.map((size, sizeIdx) => {
                                            if (size.id === order.SizeID) {
                                                // console.log("~ size.id === order.SizeID", size.id === order.SizeID);
                                                return (
                                                    <OrderCard order={order} user={user} product={product} colorEle={colorEle} size={size} />
                                                );
                                            }
                                        });
                                    }
                                });
                            });
                        }
                    });
                })}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    users: state.dashboard.users,
    products: state.dashboardProducts.products,
    orders: state.dashboardOrders.orders,
    colors: state.dashboardOrders.colors,
    sizes: state.dashboardOrders.sizes,
});

const mapDispatchToProps = { refreshOrders, refreshColors, refreshSizes, refreshProducts, getUsers, handleSnackBar };

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
