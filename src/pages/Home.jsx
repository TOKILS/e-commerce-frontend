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
import styled from "styled-components";
import "../App.css";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Home = ({ products, getAllProducts, fetchUserCartEffect }) => {
    useEffect(() => {
        getAllProducts();
    }, [getAllProducts]);

    let homeProducts = [];
    console.log(homeProducts);
    for (let i = products.length - 1; i > products.length - 4 && i >= 0; i--) {
        if (products.length >= 1 && products[i] !== undefined) {
            homeProducts.push(products[i]);
        }
    }
    return (
        <div>
            <Announcement />
            <Navbar />
            <Slider />
            <dev style={{ overflowWrap: "break-word", marginTop: "50px" }}>
                <p className="pH" style={{ margin: " 40px 0 15px 0" }}>
                    <span className="spanH" style={{ fontSize: "36px", letterSpacing: "2px" }}>
                        MOVING
                    </span>
                    <span className="spanH" style={{ textDecoration: "underline", fontSize: "40px" }}>
                        FASHION
                    </span>
                    <span className="spanH" style={{ fontSize: "36px", letterSpacing: "2px" }}>
                        FORWARD
                    </span>
                </p>
            </dev>
            <Categories />
            <dev style={{ overflowWrap: "break-word", marginTop: "50px" }}>
                <p className="pH" style={{ margin: " 40px 0 15px 0" }}>
                    <span className="spanH" style={{ fontSize: "36px", letterSpacing: "2px" }}>
                        OUR
                    </span>
                    <span className="spanH" style={{ fontSize: "40px" }}>
                        LATEST
                    </span>
                    <span className="spanH" style={{ fontSize: "36px", letterSpacing: "2px" }}>
                        PRODUCTS
                    </span>
                </p>
            </dev>
            <Container>{homeProducts.length >= 1 ? homeProducts.map((p, index) => <ItemsHome p={p} key={p.id} />) : <div></div>}</Container>
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
