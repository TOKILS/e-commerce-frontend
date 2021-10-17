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
            state.users.push( action.payload );
            // console.log("~ action", action);
        },
    },
});

export const { addUserToList } = dashboardSlice.actions;

export const getUsers = () => async (dispatch) => {
    try {
        const response = await superagent.get(`https://mid-project-01.herokuapp.com/users`).set("Authorization", "Bearer " + `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlicmFoZW0iLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSIsImRlbGV0ZSJdLCJpYXQiOjE2MzE1Mjg2NTd9.zDeGCvqnCGcuX7u76YDfC6nx2KEPmeDjuanDlKjzPVQ`);
        // console.log(`${process.env.BACKEND}/users`)
        // console.log("~ response.text", response.text);
        const users = await response.text;
        console.log("~ users ",(typeof users), " ", users)
        let parsedUsers = JSON.parse(users);

        parsedUsers.forEach((user) => {
            let cutName = user.slice(2);
            let [name, role] = cutName.split(" 〰 ");
            dispatch(
                addUserToList({
                    name: name,
                    role: role,
                })
            );
        });
    } catch (err) {
        console.error(err.message);
    }
};

export default dashboardSlice.reducer;
