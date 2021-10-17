import { combineReducers } from "redux";
import productsReducer from "./products/reducer/index";
import cart_store from "./cart/reducer/cart_reducers";
import product from "./product/product";
import cart from "./cart/cart";
import dashboardSlice from "./dashboard/dashboard.store";
export default combineReducers({
  productsReducer,
  dashboard: dashboardSlice,
  cart_store,
  product,
  cart,
});

// import { configureStore } from "@reduxjs/toolkit";

// const store = configureStore({ reducer: reducers });
