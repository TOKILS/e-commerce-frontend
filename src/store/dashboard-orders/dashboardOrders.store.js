import { createSlice } from "@reduxjs/toolkit";
import superagent from "superagent";

const dashboardOrdersSlice = createSlice({
    name: "dashboardOrders",
    initialState: { orders: [], colors: [], sizes: [] },
    reducers: {
        resetOrders(state, action) {
            state.orders.length = 0;
        },
        addOrder(state, action) {
            state.orders.push(action.payload);
        },
        deleteOrderFromRedux(state, action) {
            state.orders.find((order, idx) => {
                if (order.id === action.payload.orderID) {
                    state.orders.splice(idx, 1);
                    return true;
                }
            });
        },
        resetColors(state, action) {
            state.colors.length = 0;
        },
        addColor(state, action) {
            state.colors.push(action.payload);
        },
        resetSizes(state, action) {
            state.sizes.length = 0;
        },
        addSize(state, action) {
            state.sizes.push(action.payload);
        },
    },
});

export const { resetOrders, addOrder, deleteOrderFromRedux, resetColors, addColor, resetSizes, addSize } = dashboardOrdersSlice.actions;

export const refreshOrders = () => async (dispatch) => {
    try {
        let authToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlicmFoZW0iLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSIsImRlbGV0ZSJdLCJpYXQiOjE2MzExODMwNDJ9.t1ar77ATPUdvgu41ZhY3F5DWWx-3Z1917GFad__qin8`;

        const response = await superagent.get(`https://mid-project-01.herokuapp.com/api/v2/OrderDetails`).set("Authorization", "Bearer " + authToken);

        const orders = response.body;
        // console.log("~ orders", orders)
        await dispatch(resetOrders());
        orders.forEach((order) => {
            dispatch(addOrder(order));
        });
        return { successMsg: `Orders list updated` };
    } catch (err) {
        console.error(err.message);
        return { error: err };
    }
};
export const refreshColors = () => async (dispatch) => {
    try {
        let authToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlicmFoZW0iLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSIsImRlbGV0ZSJdLCJpYXQiOjE2MzExODMwNDJ9.t1ar77ATPUdvgu41ZhY3F5DWWx-3Z1917GFad__qin8`;

        const response = await superagent.get(`https://mid-project-01.herokuapp.com/api/v2/Color`).set("Authorization", "Bearer " + authToken);

        const colors = response.body;
        // console.log("~ colors", colors)
        await dispatch(resetColors());
        colors.forEach((color) => {
            dispatch(addColor(color));
        });
        return { successMsg: `Colors list updated` };
    } catch (err) {
        console.error(err.message);
        return { error: err };
    }
};
export const refreshSizes = () => async (dispatch) => {
    try {
        let authToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlicmFoZW0iLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSIsImRlbGV0ZSJdLCJpYXQiOjE2MzExODMwNDJ9.t1ar77ATPUdvgu41ZhY3F5DWWx-3Z1917GFad__qin8`;

        const response = await superagent.get(`https://mid-project-01.herokuapp.com/api/v2/Size`).set("Authorization", "Bearer " + authToken);

        const sizes = response.body;
        // console.log("~ sizes", sizes)
        await dispatch(resetSizes());
        sizes.forEach((size) => {
            dispatch(addSize(size));
        });
        return { successMsg: `Sizes list updated` };
    } catch (err) {
        console.error(err.message);
        return { error: err };
    }
};
export const CancelOrder = (orderID) => async (dispatch) => {
    try {
        let authToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlicmFoZW0iLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSIsImRlbGV0ZSJdLCJpYXQiOjE2MzExODMwNDJ9.t1ar77ATPUdvgu41ZhY3F5DWWx-3Z1917GFad__qin8`;

        const response = await superagent.delete(`https://mid-project-01.herokuapp.com/api/v2/OrderDetails/${orderID}`).set("Authorization", "Bearer " + authToken);
        dispatch(
            deleteOrderFromRedux({
                orderID: orderID,
            })
        );
        return { successMsg: `Order Canceled` };
    } catch (err) {
        console.error(err.message);
        return { error: err };
    }
};

export default dashboardOrdersSlice.reducer;
