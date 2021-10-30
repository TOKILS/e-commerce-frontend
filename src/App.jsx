import Home from "./pages/Home";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import { BrowserRouter as Routerer, Switch, Route } from "react-router-dom";
import AuthProvider from "./context/authentication";
import "./App.css";
import Profile from "./components/profile/profile";
import Dashboard from "./components/dashBoard/Dashboard";
import Catalog from "./components/Catalog/CatalogContainer";
import AboutUs from "./components/AboutUs/AboutUsContainer";
import ShippongInfo from "./pages/checkout/ShippingInfo";
import BillingInfo from "./pages/checkout/BillingInfo";
import { AuthContext } from "./context/authentication";

import { createTheme, ThemeProvider } from "@mui/material/styles";

// styled components

const App = (props) => {
  const snackbarTheme = createTheme({
    palette: {
      error: {
        main: "#ff1e66",
      },
      warning: {
        main: "#ffbb24",
      },
      info: {
        main: "#33aafd",
      },
      success: {
        main: "#05d1d1",
      },
    },
  });
  return (
    <AuthProvider>
      <ThemeProvider theme={snackbarTheme}>
        <Routerer>
          {/* <IsLoadingAndError> */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/Product">
              <Product />
            </Route>
            <Route
              path="/products"
              render={(props) => {
                return <Catalog value={props.location.value} />;
              }}
            />

            {/* <Route exact path="/products">
            <Catalog />
          </Route> */}

            <Route exact path="/Login">
              <Login />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/Cart">
              <Cart />
            </Route>
            <Route exact path="/Register">
              <Register />
            </Route>
            <Route exact path="/shipping">
              <ShippongInfo />
            </Route>
            <Route exact path="/billing">
              <BillingInfo />
            </Route>
            <Route exact path="/about-us">
              <AboutUs />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>
          {/* </IsLoadingAndError> */}
        </Routerer>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
