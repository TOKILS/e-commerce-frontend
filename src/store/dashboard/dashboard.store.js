import { createSlice } from "@reduxjs/toolkit";
import superagent from "superagent";

const dashboardSlice = createSlice({

    name: "dashboard",
    initialState: {
        users: [],
        support: {},

    },

    reducers: {
        resetUsersList(state, action) {
            state.users.length = 0;
        },
        addUserToList(state, action) {
            state.users.push(action.payload);
        },
        changeUser(state, action) {
            state.users.find((user, idx) => {
                if (user.token === action.payload.oldToken) {
                    console.log("~ user.token === action.payload.oldToken", user.token === action.payload.oldToken);
                    console.log(`state.users[idx] || action.payload.newUser `, state.users[idx], action.payload.newUser);
                    state.users[idx] = action.payload.newUser;
                    return true;
                }
            });
        },
        deleteUser(state, action) {
            state.users.find((user, idx) => {
                if (user.token === action.payload.token) {
                    state.users.splice(idx, 1);
                    return true;
                }
            });
        },
    },
});

export const { resetUsersList, addUserToList, changeUser, deleteUser } = dashboardSlice.actions;

export const getUsers = () => async (dispatch) => {
    try {
        const response = await superagent.get(`https://mid-project-01.herokuapp.com/allusers`).set("Authorization", "Bearer " + `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlicmFoZW0iLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSIsImRlbGV0ZSJdLCJpYXQiOjE2MzE1Mjg2NTd9.zDeGCvqnCGcuX7u76YDfC6nx2KEPmeDjuanDlKjzPVQ`);
        // console.log(`${process.env.BACKEND}/users`)
        // console.log("~ response.text", response.text);
        const users = await response.text;
        const parsedUsers = JSON.parse(users);
        await dispatch(resetUsersList());
        parsedUsers.forEach((user) => {
            let { username, firstname, lastname, email, role, createdAt, token } = user;
            dispatch(
                addUserToList({
                    username,
                    firstname,
                    lastname,
                    email,
                    role,
                    createdAt,
                    token,
                })
            );
        });
        return { successMsg: `Users list updated` };
    } catch (err) {
        console.error(err.message);
        return { error: err };
    }
};

export const updateUser = (user) => async (dispatch) => {
    // console.log("user vvv");
    // console.dir(user);
    try {
        let { username, firstname, lastname, email, role } = user;
        let oldToken = user.token;
        let userInfo = {
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            role: role,
        };
        const response = await superagent
            .put(`https://mid-project-01.herokuapp.com/updateAccount`)
            .set("Authorization", "Bearer " + user.token)
            .send(userInfo);
        // .then((ele) => {
        //     console.log(ele.body);
        //     console.log(user, "\n", "user");
        // });

        console.log("response vvvv");
        console.log(response);


        // updating redux store section
        let data = response.body;
        let newUser = {
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            role: data.role,
            createdAt: data.createdAt,
            token: data.token,
        };
        dispatch(
            changeUser({
                newUser: newUser,
                oldToken: oldToken,
            })
        );
        return { successMsg: `User ${data.username} updated` };
    } catch (err) {
        console.error(err.message);
        return { error: err };
    }

};
export const DeleteUser = (token) => async (dispatch) => {
    try {
        const response = await superagent.delete(`https://mid-project-01.herokuapp.com/deleteAccount`).set("Authorization", "Bearer " + `${token}`);
        console.log("~ delete response", response);
        dispatch(
            deleteUser({
                token: token,
            })
        );
        return { successMsg: `User deleted` };
    } catch (err) {
        console.error(err.message);
        return { error: err };
    }
};

export const signUpUser = (user) => async (dispatch) => {
    // console.log("user vvv");
    // console.dir(user);
    try {
        let { username, firstname, lastname, password, email, role } = user;
        let userInfo = {
            username: username,
            firstname: firstname,
            lastname: lastname,
            password: password,
            email: email,
            role: role,
        };
        const response = await superagent.post(`https://mid-project-01.herokuapp.com/signup`).send(userInfo);

        console.log("response vvvv");
        console.log(response);

        // updating redux store section
        let data = response.body;
        let newUser = {
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            role: data.role,
            createdAt: data.createdAt,
            token: data.token,
        };
        dispatch(
            addUserToList({
                ...newUser,
            })
        );
        return { successMsg: `User ${data.username} signed up successfully` };
    } catch (err) {
        console.error(err.message);
        return { error: err };
    }
};

export default dashboardSlice.reducer;
