import React from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import Login from "./components/login/login";
import Auth from "./components/login/auth";
import AuthProvider from "./context/authentication";
import Header from "./components/header/Header.js";
import "./App.css";
import Products from "./components/products/ProductList";

function App() {
  return (
    <AuthProvider>
      <Login />
      <Auth capability="read">
        <Header />
        <p>Welcome</p>
        <Products />
      </Auth>
    </AuthProvider>
  );
}

export default App;
