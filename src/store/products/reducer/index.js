import {
    ALL_PRODUCTS,
    SEARCHED_PRODUCTS,
    PRODUCTS_BY_CATEGORY,
    SET_CATEGORIES,
    SELECT_CATEGORY,
    GET_PRODUCT_BY_ID,
} from "../actions/index";

let initialState = {
    allProducts: [],
    searchedProducts: [],
    handleChange: 0,
    productsByCategory: [],
    selectedCategory: "",
    categories: [],
    productById: [],
};

const productsReducer = (state = initialState, action) => {
    if (action.type === ALL_PRODUCTS) {
        return {
            ...state,
            allProducts: action.payload,
        };
    }

    if (action.type === SEARCHED_PRODUCTS) {
        let random = Math.random();
        if (random === state.handleChange) {
            random = Math.random();
        }
        return {
            ...state,
            searchedProducts: action.payload ? action.payload : [],
            handleChange: random,
        };
    }

    if (action.type === PRODUCTS_BY_CATEGORY) {
        return {
            ...state,
            productsByCategory: action.payload,
        };
    }

    if (action.type === SET_CATEGORIES) {
        return {
            ...state,
            categories: action.payload,
        };
    }

    if (action.type === SELECT_CATEGORY) {
        return {
            ...state,
            selectedCategory: action.payload,
        };
    }

    if (action.type === GET_PRODUCT_BY_ID) {
        return {
            ...state,
            productById: action.payload,
        };
    }

    return state;
};

export default productsReducer;