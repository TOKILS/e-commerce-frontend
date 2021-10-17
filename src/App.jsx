import Home from "./pages/Home";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import { BrowserRouter as Routerer, Switch, Route } from "react-router-dom";
import Checkout from "./pages/checkout/Checkout";
import AuthProvider from "./context/authentication";
import "./App.css";

import Catalog from "./components/Catalog/CatalogContainer";

const App = () => {
  return (
    <AuthProvider>
      <Routerer>
        {/* <IsLoadingAndError> */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/Product">
            <Product />
          </Route>
          <Route exact path="/products">
            <Catalog name={""} />
          </Route>
          <Route exact path="/ProductList">
            <ProductList />
          </Route>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/Cart">
            <Cart />
          </Route>
          <Route exact path="/Register">
            <Register />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
        </Switch>
        {/* </IsLoadingAndError> */}
      </Routerer>
    </AuthProvider>
  );
};

export default App;
