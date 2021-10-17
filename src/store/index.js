import { combineReducers } from "redux";
import productsReducer from "./products/reducer/index";
import cart_store from "./cart/reducer/cart_reducers";


export default combineReducers({
    productsReducer,
    cart_store,

});