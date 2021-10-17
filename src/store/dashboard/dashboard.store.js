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
      state.users.push(action.payload);
      // console.log("~ action", action);
    },
    changeUser(state, action) {
      state.users.find((user, idx) => {
        if (user.token === action.payload.oldToken) {
          state.users[idx] = action.newUser;
          return true;
        }
      });
    },
    deleteUser(state, action) {
      state.users.find((user, idx) => {
        if (user.token === action.payload.token) {
          console.log("user.token === action.token = true");
          state.users.splice(idx, 1);
          return true;
        }
      });
    },
  },
});

export const { addUserToList, changeUser, deleteUser } = dashboardSlice.actions;

export const getUsers = () => async (dispatch) => {
  try {
    const response = await superagent
      .get(`https://mid-project-01.herokuapp.com/allusers`)
      .set(
        "Authorization",
        "Bearer " +
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlicmFoZW0iLCJjYXBhYmlsaXRpZXMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSIsImRlbGV0ZSJdLCJpYXQiOjE2MzE1Mjg2NTd9.zDeGCvqnCGcuX7u76YDfC6nx2KEPmeDjuanDlKjzPVQ`
      );
    // console.log(`${process.env.BACKEND}/users`)
    // console.log("~ response.text", response.text);
    const users = await response.text;
    const parsedUsers = JSON.parse(users);
    parsedUsers.forEach((user) => {
      let { username, firstname, lastname, email, role, createdAt, token } =
        user;
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
  } catch (err) {
    console.error(err.message);
    return { error: err };
  }
};

export const updateUser = (user) => async (dispatch) => {
  // console.log("user vvv");
  // console.dir(user);
  try {
    let { userName, firstName, lastName, email, role } = user;
    let oldToken = user.token;
    let userInfo = {
      username: userName,
      firstname: firstName,
      lastname: lastName,
      email: email,
      role: role,
    };
    const response = await superagent
      .put(`https://mid-project-01.herokuapp.com/updateAccount`)
      .set("Authorization", "Bearer " + user.token)
      .send(userInfo)
      .then((ele) => {
        console.log(ele.body);
        console.log(user, "\n", "user");
      });

    // console.log("response vvvv");
    // console.log(response.body);

    // updating redux store section
    // let data = response.body;
    // let newUser = {
    //     userName: data.username,
    //     firstName: data.firstname,
    //     lastName: data.lastname,
    //     email: data.email,
    //     role: data.role,
    //     token: data.token,
    // };
    // dispatch(
    //     changeUser({
    //         newUser: newUser,
    //         oldToken: oldToken,
    //     })
    // );
  } catch (err) {
    console.error(err.message);
    return { error: err };
  }
};
export const DeleteUser = (token) => async (dispatch) => {
  try {
    const response = await superagent
      .delete(`https://mid-project-01.herokuapp.com/deleteAccount`)
      .set("Authorization", "Bearer " + `${token}`);
    console.log("~ delete response", response);
    dispatch(
      deleteUser({
        token: token,
      })
    );
  } catch (err) {
    console.error(err.message);
    return { error: err };
  }
};

export default dashboardSlice.reducer;
