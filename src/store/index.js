// general
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

// slices
import currentItemSlice from "./currentItem.store";

// store configuration
const reducers = combineReducers({ currentItem: currentItemSlice });
const store = configureStore({ reducer: reducers });

export default store;
