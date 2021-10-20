import { combineReducers } from "redux";
import productsReducer from "./products/reducer/index";
import cart_store from "./cart/reducer/cart_reducers";
import product from "./product/product";
import cart from "./cart/cart";
import dashboardSlice from "./dashboard/dashboard.store";
import snackbarSlice from "./snackbar/snackbar.store";
import dashboardProductsSlice from "./dashboard-products/dashboardProducts.store";
import dashboardOrdersSlice from "./dashboard-orders/dashboardOrders.store";
export default combineReducers({
    productsReducer,
    dashboard: dashboardSlice,
    cart_store,
    product,
    cart,
    snackbar: snackbarSlice,
    dashboardProducts: dashboardProductsSlice,
    dashboardOrders: dashboardOrdersSlice,
});

// import { configureStore } from "@reduxjs/toolkit";

// const store = configureStore({ reducer: reducers });
