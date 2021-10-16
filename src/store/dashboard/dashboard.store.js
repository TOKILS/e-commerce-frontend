import { createSlice } from "@reduxjs/toolkit";
import superagent from "superagent";


const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        users: [],
        products: {},
        support: {},
    },

    reducers: {
        addUserToList(state, action) {
            state.push({ user: action.payload });
            console.log("~ state", state);
        },
    },
});

export const { addUserToList } = dashboardSlice.actions;

export const getUsers = () => async (dispatch) => {
    // const response = await superagent.get(`${process.env.BACKEND}/users`);
    console.log(`${process.env.SKIP_PREFLIGHT_CHECK}/users`)
    // console.log("~ response", response)
    // const users = await response.data.json();
    // users.results.forEach((user) => {
    //     let cutName = user.slice(2);
    //     let [name, role] = cutName.split(" 〰 ");
    //     dispatch(
    //         addUserToList({
    //             name: name,
    //             role: role,
    //         })
    //     );
    // });
};

export default dashboardSlice.reducer;
