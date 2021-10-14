import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import product from "./product/product";
import { configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({ product: product });

const store = configureStore({ reducer: reducers });

export default store;
