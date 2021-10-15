import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import product from "./product/product";
import cart from "./cart/cart";
import { configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({ product: product, cart: cart });

const store = configureStore({ reducer: reducers });

export default store;
