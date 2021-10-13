// general
import React from "react";

// 3rd part components
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

// components
import Login from "./components/login/login";
import Auth from "./components/login/auth";
import AuthProvider from "./context/authentication";
import Header from "./components/header/Header.js";
import Footer from "./components/footer/Footer.js";
import SingleItem from "./components/singleItem/SingleItem";

// redux
import { Provider } from "react-redux";
import store from "./store/index";

// CSS file
import "./App.scss";

function App(props) {
    return (
        <div className="appJS">
            <AuthProvider>
                <Provider store={store}>
                    <Login />
                    <Auth capability="read">
                        <Header />
                        <div className="mainDiv">
                            <SingleItem />
                        </div>
                        <Footer />
                    </Auth>
                </Provider>
            </AuthProvider>
        </div>
    );
}

export default App;
