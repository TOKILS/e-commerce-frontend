import { createSlice } from "@reduxjs/toolkit";
import superagent from "superagent";

const dashboardProductsSlice = createSlice({
    name: "dashboardProducts",
    initialState: [],
    reducers: {
        resetCategories(state, action) {
            state = [];
        },
        addCategory(state, action) {
            state.push(action.payload);
        },
        addType(state, action) {},
        addProduct(state, action) {},
    },
});

export const { resetCategories, addCategory, addType, addProduct } = dashboardProductsSlice.actions;

export const refreshCategories = () => async (dispatch) => {
    try {
        const response = await superagent.get(`https://mid-project-01.herokuapp.com/api/v2/Category/`);
        // console.log(`${process.env.BACKEND}/users`)
        // console.log("~ response.text", response.text);
        const categories = response.body;
        const parsedCategories = JSON.parse(categories);
        await dispatch(resetCategories());
        parsedCategories.forEach((category) => {
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
        return { successMsg: `Users list updated` };
    } catch (err) {
        console.error(err.message);
        return { error: err };
    }
};
export const refreshTypes = () => async (dispatch) => {
    try {
    } catch (err) {}
};
export const refreshProducts = () => async (dispatch) => {
    try {
    } catch (err) {}
};

export default dashboardProductsSlice.reducer;
