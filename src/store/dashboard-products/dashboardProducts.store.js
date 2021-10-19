import { createSlice } from "@reduxjs/toolkit";
import superagent from "superagent";

const dashboardProductsSlice = createSlice({
    name: "dashboardProducts",
    initialState: { categories: [], types: [], products: [] },
    reducers: {
        resetCategories(state, action) {
            state.categories.length = 0;
        },
        addCategory(state, action) {
            state.categories.push(action.payload);
        },
        resetTypes(state, action) {
            state.types.length = 0;
        },
        addType(state, action) {
            state.types.push(action.payload);
        },
        resetProducts(state, action) {
            state.products.length = 0;
        },
        addProduct(state, action) {
            state.products.push(action.payload);
        },
    },
});

export const { resetCategories, addCategory, resetTypes, addType, resetProducts, addProduct } = dashboardProductsSlice.actions;

export const refreshCategories = () => async (dispatch) => {
    try {
        const response = await superagent.get(`https://mid-project-01.herokuapp.com/api/v2/Category/`);
        // console.log(`${process.env.BACKEND}/users`)
        // console.log("~ response.text", response.text);
        const categories = response.body;
        await dispatch(resetCategories());
        categories.forEach((category) => {
            let { id, Name, Description, Image, createdAt, updatedAt } = category;
            dispatch(
                addCategory({
                    id,
                    Name,
                    Description,
                    Image,
                    createdAt,
                    updatedAt,
                })
            );
        });
        return { successMsg: `Categories list updated` };
    } catch (err) {
        console.error(err.message);
        return { error: err };
    }
};
export const refreshTypes = () => async (dispatch) => {
    try {
        const response = await superagent.get(`https://mid-project-01.herokuapp.com/api/v2/Type`);
        // console.log(`${process.env.BACKEND}/users`)
        // console.log("~ response.text", response.text);
        const types = response.body;
        await dispatch(resetTypes());
        await types.forEach((type) => {
            let { id, CategoryID, Name, Description, createdAt, updatedAt } = type;
            dispatch(
                addType({
                    id,
                    CategoryID,
                    Name,
                    Description,
                    createdAt,
                    updatedAt,
                })
            );
        });
        return { successMsg: `Types list updated` };
    } catch (err) {
        console.error(err.message);
        return { error: err };
    }
};
export const refreshProducts = () => async (dispatch) => {
    try {
        // TODO: change to https://mid-project-01.herokuapp.com/api/v3/Products
        const response = await superagent.get(`https://mid-project-01.herokuapp.com/api/v2/Product`);
        // console.log(`${process.env.BACKEND}/users`)
        // console.log("~ response.text", response.text);
        const products = response.body;
        await dispatch(resetProducts());
        await products.forEach((product) => {
            let { id, TypeID, Name, Description, Price, Quantity, Discount, createdAt, updatedAt } = product;
            dispatch(
                addProduct({
                    id,
                    TypeID,
                    Name,
                    Description,
                    Price,
                    Quantity,
                    Discount,
                    createdAt,
                    updatedAt,
                })
            );
        });
        return { successMsg: `Products list updated` };
    } catch (err) {
        console.error(err.message);
        return { error: err };
    }
};

export default dashboardProductsSlice.reducer;
