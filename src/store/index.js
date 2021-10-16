import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

// reducers
import product from "./product/product";
import dashboardSlice from "./dashboard/dashboard.store";

const reducers = combineReducers({ product: product, dashboard: dashboardSlice });

const store = configureStore({ reducer: reducers });

export default store;
