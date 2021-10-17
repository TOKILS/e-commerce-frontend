import { combineReducers } from "redux";
import productsReducer from "./products/reducer/index";
import cart_store from "./cart/reducer/cart_reducers";
import product from "./product/product";
import cart from "./cart/cart";

export default combineReducers({
  productsReducer,
  cart_store,
  product,
  cart,
});
