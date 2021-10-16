import React, { useEffect } from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Slider from "../components/Slider";
import { connect } from "react-redux";
import { fetchAllProducts } from "../store/products/actions";
import ItemsHome from "./ItemsHome";

const Home = ({ products, getAllProducts, fetchUserCartEffect }) => {
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  let homeProducts = [];
  console.log(homeProducts);
  for (let i = products.length - 1; i > products.length - 6 && i >= 0; i--) {
    if (products.length >= 1 && products[i] !== undefined) {
      homeProducts.push(products[i]);
    }
  }
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      {homeProducts.length >= 1 ? (
        homeProducts.map((p, index) => <ItemsHome p={p} key={p.id} />)
      ) : (
        <div></div>
      )}
      {/* <Products /> */}
      <Newsletter />
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.productsReducer.allProducts,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    getAllProducts: () => dispatch(fetchAllProducts()),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
