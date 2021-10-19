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
            let CategoryIDName = CategoryID == 1 ? "cat_BAGS" : CategoryID == 2 ? "cat_SHOES" : CategoryID == 3 ? "cat_SHIRT" : "cat_idk";
            dispatch(
                addType({
                    id,
                    CategoryID,
                    CategoryIDName,
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
        const response = await superagent.get(`https://mid-project-01.herokuapp.com/api/v3/Products`);
        // console.log(`${process.env.BACKEND}/users`)
        // console.log("~ response.text", response.text);
        const products = response.body;
        await dispatch(resetProducts());
        await products.forEach((product) => {
            let { id, TypeID, Name, Description, Price, Quantity, Discount, createdAt, updatedAt, color } = product;
            let TypeIDName = TypeID == 1 ? "type_BAGS" : TypeID == 2 ? "type_SHOES" : TypeID == 5 ? "type_SHIRT" : TypeID == 6 ? "type_Dogs" : "type_idk";
            dispatch(
                addProduct({
                    id,
                    TypeID,
                    TypeIDName,
                    Name,
                    Description,
                    Price,
                    Quantity,
                    Discount,
                    createdAt,
                    updatedAt,
                    color,
                })
            );
        });
        return { successMsg: `Products list updated` };
    } catch (err) {
        console.error(err.message);
        return { error: err };
    }
};
export const addProductToBackend = (productObj, colorObj, sizeObj, imageObj) => async (dispatch) => {
    try {
        console.log("addProductToBackend RAN");
        let authToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlicmFoZW0iLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSIsImRlbGV0ZSJdLCJpYXQiOjE2MzExODMwNDJ9.t1ar77ATPUdvgu41ZhY3F5DWWx-3Z1917GFad__qin8`;

        // add product
        const productResponse = await superagent
            .post(`https://mid-project-01.herokuapp.com/api/v2/Product`)
            .set("Authorization", "Bearer " + authToken)
            .send(productObj);
        console.log("~ productResponse.body", productResponse.body);
        const backProductId = productResponse.body.id;

        // add color
        let newColorObj = { ...colorObj, ProductID: backProductId };
        const colorResponse = await superagent
            .post(`https://mid-project-01.herokuapp.com/api/v2/Color`)
            .set("Authorization", "Bearer " + authToken)
            .send(newColorObj);
        console.log("~ colorResponse.body", colorResponse.body);
        const backColorId = colorResponse.body.id;

        // add size
        let newSizeObj = { ...sizeObj, ColorID: backColorId };
        const sizeResponse = await superagent
            .post(`https://mid-project-01.herokuapp.com/api/v2/Size`)
            .set("Authorization", "Bearer " + authToken)
            .send(newSizeObj);
        console.log("~ sizeResponse.body", sizeResponse);

        // add image
        let newImageObj = { ...imageObj, ColorID: backColorId };
        const imageResponse = await superagent
            .post(`https://mid-project-01.herokuapp.com/api/v2/Image`)
            .set("Authorization", "Bearer " + authToken)
            .send(newImageObj);
        console.log("~ imageResponse.body", imageResponse);

        let imageResponseBody = imageResponse.body;

        // let colorObjToAdd = [
        //     {
        //         id:imageResponseBody.id,
        //         ProductID: imageResponseBody.ProductID,
        //         Name: imageResponseBody.Name,
        //         Code: imageResponseBody.Code,
        //         Image: imageResponseBody.Image,
        //         createdAt: imageResponseBody.createAt,
        //         updatedAt: updatedAt,
        //         image: [
        //             {
        //                 id: 11,
        //                 ColorID: 9,
        //                 Image: "https://cdn.shopify.com/s/files/1/1136/2606/products/ABLE21-FALL-074_2048x2048.jpg?v=1628528064",
        //                 createdAt: "2021-10-18T21:58:58.526Z",
        //                 updatedAt: "2021-10-18T21:58:58.526Z",
        //             },
        //         ],
        //         size: [
        //             {
        //                 id: 9,
        //                 ColorID: 9,
        //                 Size: "NA",
        //                 createdAt: "2021-10-18T21:58:40.769Z",
        //                 updatedAt: "2021-10-18T21:58:40.769Z",
        //             },
        //         ],
        //     },
        // ];

        // let productToAddToRedux = {
        //     id,
        //     TypeID,
        //     TypeIDName,
        //     Name,
        //     Description,
        //     Price,
        //     Quantity,
        //     Discount,
        //     createdAt,
        //     updatedAt,
        //     color,
        // };

        return { successMsg: `Added product successfully` };
    } catch (err) {
        console.error(err.message);
        return { error: err };
    }
};

export default dashboardProductsSlice.reducer;
