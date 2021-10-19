import React from "react";
import { useState, useEffect } from "react";
import base64 from "base-64";
import jwt from "jsonwebtoken";
import cookie from "react-cookies";
import superagent from "superagent";

export const AuthContext = React.createContext();

const serverAPI = "https://mid-project-01.herokuapp.com";

export default function AuthProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState({});

  const login = async (username, password) => {
    try {
      const encodUsePass = base64.encode(`${username}:${password}`);

      const res = await superagent
        .post(`${serverAPI}/signin`)
        .set("authorization", `Basic ${encodUsePass}`);
      setToken(res.body.token);
      return validateJWT(res.body.token);
    } catch (error) {
      alert("Invalid username or password");
      return false;
    }
  };

  const signup = async (userName, passWord, firstname, lastname, email) => {
    // role
    try {
      let userObj = {
        username: userName,
        firstname: firstname,
        lastname: lastname,
        password: passWord,
        email: email,
        // role: role
      };
      //   console.log(userObj);
      const res = await superagent.post(`${serverAPI}/signup`, userObj);

      login(userObj.username, userObj.password);
      return true;
      //   return validateJWT(res.body.token);
    } catch (error) {
      alert(error.message);
      return false;
    }
  };

  const validateJWT = (token) => {
    if (token) {
      const user = jwt.decode(token);
      handleLoginState(true, user);

      cookie.save("token", token);
      return true;
    } else {
      handleLoginState(false, {});
      return false;
    }
  };

  const handleLoginState = (loggedIn, user) => {
    setLoggedIn(loggedIn);
    setUser(user);
  };

  const logout = () => {
    handleLoginState(false, {});
    cookie.remove("token");
  };

  useEffect(() => {
    const SavedCookieToken = cookie.load("token");
    setToken(SavedCookieToken);

    validateJWT(SavedCookieToken);
    // eslint-disable-next-line
  }, []);

  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  };

  const state = {
    loggedIn,
    signup,
    login,
    logout,
    user,
    can,
    token,
  };

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
}
