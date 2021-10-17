import axios from "axios";
import {
    GET_CATEGORIES,
    GET_PRODUCT,
    GET_PRODUCTS,
} from "../../../constants/api";

export const ALL_PRODUCTS = "GET_ALL_PRODUCTS";

export const SEARCHED_PRODUCTS = "SET_SEARCHED_PRODUCTS";

export const PRODUCTS_BY_CATEGORY = "PRODUCTS_BY_CATEGORY";

export const SELECT_CATEGORY = "SELECT_CATEGORY";

export const SET_CATEGORIES = "SET_CATEGORIES";

export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";


export const setAllProducts = (payload) => {
    return {
        type: ALL_PRODUCTS,
        payload,
    };
};

export const fetchAllProducts = () => {
    return (dispatch) => {
        axios.get(GET_PRODUCTS).then((response) => {
            dispatch(setAllProducts(response.data));
        });
    };
};

export const setSearchedProducts = (payload) => {
    return {
        type: SEARCHED_PRODUCTS,
        payload,
    };
};

export const fetchSearchProducts = (value) => {
    return (dispatch) => {
        axios.get(`${GET_PRODUCT}/${value}`).then((response) => {
            dispatch(setSearchedProducts(response.data));
        });
    };
};

export const setProductsByCategory = (payload) => {
    return {
        type: PRODUCTS_BY_CATEGORY,
        payload,
    };
};

export const setCategories = (payload) => {
    return {
        type: SET_CATEGORIES,
        payload,
    };
};

export const fetchCategories = () => {
    return (dispatch) => {
        axios.get(GET_CATEGORIES).then((response) => {
            dispatch(setCategories(response.data));
        });
    };
};

export const selectCategory = (payload) => {
    return {
        type: SELECT_CATEGORY,
        payload,
    };
};

export const getProductById = (payload) => {
    return {
        type: GET_PRODUCT_BY_ID,
        payload,
    };
};

export const fetchProductById = (id) => {
    return (dispatch) => {
        axios.get(`${GET_PRODUCT}/${id}`).then((response) => {
            dispatch(getProductById(response.data));
        });
    };
};